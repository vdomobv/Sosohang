package project.app.c109.backendapp.member.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.member.domain.dto.request.LoginRequest;
import project.app.c109.backendapp.member.domain.dto.request.RegisterRequest;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.service.MemberService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/member")
@Tag(name = "MEMBER", description = "MEMBER API DOC")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }

        Member member = memberService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(member); // 201 Created for resource creation
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        if (result.hasErrors()) {
            return handleValidationErrors(result);
        }

        Member member = memberService.login(loginRequest);
        return ResponseEntity.ok(member);
    }

    private ResponseEntity<?> handleValidationErrors(BindingResult result) {
        StringBuilder errorMsg = new StringBuilder();
        for (FieldError error : result.getFieldErrors()) {
            errorMsg.append(error.getDefaultMessage()).append("\n");
        }
        return ResponseEntity.badRequest().body(errorMsg.toString().trim());
    }
}
