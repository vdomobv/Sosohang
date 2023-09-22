package project.app.c109.backendapp.member.controller;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.member.domain.dto.request.LoginRequest;
import project.app.c109.backendapp.member.domain.dto.request.RegisterRequest;
import project.app.c109.backendapp.member.domain.dto.response.LoginResponse;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.service.MemberService;


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

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원가입 성공",
                    content = {@Content(schema = @Schema(example = "{'member':{memberSeq, memberNickname, memberPassword, memberPhone, memberRole}}"))}),
            @ApiResponse(responseCode = "400", description = "요청 오류",
                    content = {@Content(schema = @Schema(example = "error : Bad Request."))}),
            @ApiResponse(responseCode = "409", description = "사용자 중복",
                    content = {@Content(schema = @Schema(example = "error : Phone number already in use."))}),
            @ApiResponse(responseCode = "500", description = "서버 오류",
                    content = {@Content(schema = @Schema(example = "error : Internal Server Error."))})
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }

        try {
            Member member = memberService.register(registerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(member); // 201 Created for resource creation
        } catch (EntityExistsException ex) {
            // 회원 가입 실패 처리 409 상태 코드 반환
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("{\"error\": \"Phone number already in use.\"}");
        }
    }

    @PostMapping("/login")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 성공",
                    content = {@Content(schema = @Schema(example = "{'token':{token_info}, 'member':{memberSeq, memberNickname, memberPassword, memberPhone, memberRole}}"))}),
            @ApiResponse(responseCode = "401", description = "인증 실패",
                    content = {@Content(schema = @Schema(example = "error : Invalid credentials."))}),
            @ApiResponse(responseCode = "404", description = "사용자 없음",
                    content = {@Content(schema = @Schema(example = "error : Member not found."))}),
            @ApiResponse(responseCode = "500", description = "서버 오류",
                    content = {@Content(schema = @Schema(example = "error : Internal Server Error."))})
    })
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }
        try {
            LoginResponse response = memberService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException ex) {
            // 사용자를 찾지 못한 경우 404 상태 코드 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Member not found.\"}");
        } catch (BadCredentialsException ex) {
            // 로그인 실패 처리 401 상태 코드 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Invalid credentials.\"}");
        }
    }

    private ResponseEntity<?> handleValidationErrors(BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        response.put("Bad Request", "Validation failed");
        List<String> errorMessages = result.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
        response.put("errors", errorMessages);
        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/jwt_test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("토큰이 있는 사용자");
    }
}
