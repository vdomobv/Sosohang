package project.app.c109.backendapp.member.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.config.security.jwt.JwtUtils;
import project.app.c109.backendapp.member.domain.dto.request.LoginRequest;
import project.app.c109.backendapp.member.domain.dto.request.RegisterRequest;
import project.app.c109.backendapp.member.domain.dto.response.LoginResponse;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.domain.entity.MemberRole;
import project.app.c109.backendapp.member.repository.MemberRepository;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public Member register(RegisterRequest registerRequest) {
        if (memberRepository.existsByMemberPhone(registerRequest.getMemberPhone())) {
            throw new EntityExistsException("Phone number already in use.");
        }

        Member member = Member.builder()
                .memberNickname(registerRequest.getMemberNickname())
                .memberPassword(passwordEncoder.encode(registerRequest.getMemberPassword()))
                .memberPhone(registerRequest.getMemberPhone())
                .memberRole(MemberRole.MEMBER)
                .build();

        return memberRepository.save(member);
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Member member = memberRepository.findByMemberPhone(loginRequest.getMemberPhone())
                .orElseThrow(() -> new EntityNotFoundException("Invalid credentials."));

        if (!passwordEncoder.matches(loginRequest.getMemberPassword(), member.getMemberPassword())) {
            throw new BadCredentialsException("Invalid credentials.");
        }

        List<String> roles = Collections.singletonList(member.getMemberRole().toString());
        String token = jwtUtils.generateToken(member.getMemberPhone(), roles);

        return new LoginResponse(token, member);
    }

}
