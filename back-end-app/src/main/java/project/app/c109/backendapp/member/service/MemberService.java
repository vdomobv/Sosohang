package project.app.c109.backendapp.member.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.member.domain.dto.request.LoginRequest;
import project.app.c109.backendapp.member.domain.dto.request.RegisterRequest;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.domain.entity.MemberRole;
import project.app.c109.backendapp.member.repository.MemberRepository;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
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

    public Member login(LoginRequest loginRequest) {
        Member member = memberRepository.findByMemberPhone(loginRequest.getMemberPhone())
                .orElseThrow(() -> new EntityNotFoundException("Invalid credentials."));

        if (!passwordEncoder.matches(loginRequest.getMemberPassword(), member.getMemberPassword())) {
            throw new BadCredentialsException("Invalid credentials.");
        }

        return member;
    }
}

