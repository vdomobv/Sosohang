package project.app.c109.backendapp.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.member.domain.dto.response.AuthResponse;
import project.app.c109.backendapp.member.domain.dto.request.MemberLoginRequest;
import project.app.c109.backendapp.member.domain.dto.request.MemberRegisterRequest;
import project.app.c109.backendapp.member.domain.dto.response.LoginResponse;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.service.MemberService;
import project.app.c109.backendapp.store.domain.dto.request.StoreUpdateRequest;
import project.app.c109.backendapp.store.domain.entity.Store;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/member")
@Tag(name = "MEMBER", description = "MEMBER API DOC")
public class MemberController {

    private final MemberService memberService;
    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/register")
    @Operation(summary = "회원가입")
    public ResponseEntity<Member> register(@Valid @RequestBody MemberRegisterRequest memberRegisterRequest, BindingResult result) {
        if (result.hasErrors()) {
            logger.info("회원가입 유효성 검사 에러 : {}", result.getAllErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
        try {
            Member member = memberService.register(memberRegisterRequest);
            logger.info("회원가입 성공 : {}", member);
            return ResponseEntity.ok(member);
        } catch (EntityExistsException ex) {
            logger.info("가입된 번호입니다.");
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(null); // 실패 시 Member 객체를 null로 반환
        }
    }

    @PostMapping("/register/phone-check")
    public ResponseEntity<AuthResponse> handlePhoneVerification(@RequestParam String memberPhone) {
        logger.info("Received a phone verification request for memberPhone: {}", memberPhone);
        String authCode = memberService.handlePhoneVerification(memberPhone);

        if (authCode != null) {
            AuthResponse response = new AuthResponse("success", authCode);
            logger.info("Phone verification successful for memberPhone: {}", memberPhone);
            return ResponseEntity.ok(response);
        } else {
            AuthResponse response = new AuthResponse("error", "Phone number already in use.");
            logger.warn("Phone number already in use for memberPhone: {}", memberPhone);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping("/register/verify-code")
    public ResponseEntity<AuthResponse> verifyAuthCode(@RequestParam String memberPhone,
                                                              @RequestParam String authCode) {
        logger.info("Received verification of authCode {} for memberPhone: {}", authCode, memberPhone);
        boolean isVerified = memberService.verifyAuthCode(memberPhone, authCode);

        if (isVerified) {
            AuthResponse response = new AuthResponse("success", "The authentication code is valid.");
            logger.info("Authentication code verified successfully for memberPhone: {}", memberPhone);
            return ResponseEntity.ok(response);
        } else {
            AuthResponse response = new AuthResponse("error", "The authentication code is invalid or expired.");
            logger.warn("Authentication code verification failed for memberPhone: {}", memberPhone);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody MemberLoginRequest memberLoginRequest, BindingResult result) {
        if (result.hasErrors()) {
            logger.info("Validation errors: {}", result.getAllErrors());
            return handleValidationErrors(result);
        }
        try {
            LoginResponse response = memberService.login(memberLoginRequest);
            logger.info("Member logged in successfully: {}", response.getMember());
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException ex) {
            logger.warn("Member not found.");
            // 사용자를 찾지 못한 경우 404 상태 코드 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Member not found.\"}");
        } catch (BadCredentialsException ex) {
            logger.warn("Invalid credentials.");
            // 로그인 실패 처리 401 상태 코드 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Invalid credentials.\"}");
        }
    }

    @PostMapping("/password/phone-check")
    public ResponseEntity<Map<String, String>> handlePhoneCheckForPassword(@RequestParam String memberPhone) {
        logger.info("Received a phone check request for memberPhone: {}", memberPhone);

        String authCode = memberService.handlePhoneVerificationForPasswordReset(memberPhone);
        Map<String, String> response = new HashMap<>();

        if (authCode != null) {
            response.put("status", "success");
            response.put("authCode", authCode);
            logger.info("Phone verification successful for password reset for memberPhone: {}", memberPhone);
            return new ResponseEntity<>(response, HttpStatus.CREATED); // 201
        } else {
            response.put("status", "error");
            response.put("message", "The phone number is not registered.");
            logger.warn("Phone number not registered for password reset for memberPhone: {}", memberPhone);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); // 400
        }
    }

    @PostMapping("/password/verify-code")
    public ResponseEntity<Map<String, String>> verifyAuthCodeForPasswordReset(@RequestParam String memberPhone,
                                                                              @RequestParam String authCode) {
        logger.info("Received verification of authCode {} for password reset for memberPhone: {}", authCode, memberPhone);

        boolean isVerified = memberService.verifyAuthCode(memberPhone, authCode);

        Map<String, String> response = new HashMap<>();

        if (isVerified) {
            response.put("status", "success");
            response.put("message", "The authentication code is valid.");
            logger.info("Authentication code verified successfully for password reset for memberPhone: {}", memberPhone);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("status", "error");
            response.put("message", "The authentication code is invalid or expired.");
            logger.warn("Authentication code verification failed for password reset for memberPhone: {}", memberPhone);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/password/change")
    public ResponseEntity<Map<String, String>> changePassword(@RequestParam String memberPhone,
                                                              @RequestParam String newPassword) {
        logger.info("Received a request to change password for memberPhone: {}", memberPhone);

        memberService.changePassword(memberPhone, newPassword);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Password has been successfully changed.");
        logger.info("Password changed successfully for memberPhone: {}", memberPhone);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private ResponseEntity<?> handleValidationErrors(BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        response.put("Bad Request", "Validation failed");
        List<String> errorMessages = result.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
        response.put("errors", errorMessages);
        logger.info("Validation errors: {}", errorMessages);
        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/jwt_test")
    public ResponseEntity<String> testEndpoint() {
        logger.info("Received a request to test JWT endpoint");
        return ResponseEntity.ok("토큰이 있는 사용자");
    }

    @GetMapping("/{memberSeq}")
    public ResponseEntity<?> getMemberByMemberPhone(@PathVariable Integer memberSeq) {
        Member member = memberService.getMemberByMemberSeq(memberSeq);

        if (member != null ) {
            return ResponseEntity.ok(member);
        } else {
            return ResponseEntity.badRequest().body("member not found");
        }
    }

    @PutMapping("/update/{memberSeq}")
    public ResponseEntity<Member> updateMemberInfo(@PathVariable Integer memberSeq, @RequestParam String newMemberNickname) {
        try {
            Member updatedMember = memberService.updateMemberInfo(memberSeq, newMemberNickname);
            return ResponseEntity.ok(updatedMember);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

