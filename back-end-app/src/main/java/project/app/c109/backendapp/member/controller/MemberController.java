package project.app.c109.backendapp.member.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.member.domain.dto.SignUpFormDto;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.service.MemberService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/members")
@Tag(name = "MEMBER", description = "MEMBER API DOC")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    /**
     * 회원 가입 요청 처리
     *
     * @param signUpFormDto 회원 가입 폼 데이터
     * @param bindingResult 입력 데이터 유효성 검사 결과
     * @return 회원 가입 결과 및 회원 정보
     */
    @PostMapping("/signup")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpFormDto signUpFormDto, BindingResult bindingResult) {
        // 입력 데이터 유효성 검사
        if (bindingResult.hasErrors()) {
            // BindingResult에서 오류 정보를 가져와서 응답으로 전달
            StringBuilder errorMessage = new StringBuilder("회원 가입 요청 실패: ");
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errorMessage.append(fieldError.getDefaultMessage()).append("; ");
            }
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }
        // Member 엔터티 생성 및 저장
        try {
            Member member = memberService.createMember(signUpFormDto); // createMember 메서드 호출
            System.out.println("등록된 Member 정보: " + member);
            return ResponseEntity.status(HttpStatus.CREATED).body(member);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("회원 가입 요청 실패: " + e.getMessage());
        }
    }
}
