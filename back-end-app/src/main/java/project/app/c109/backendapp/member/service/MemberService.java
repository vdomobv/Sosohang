package project.app.c109.backendapp.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
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
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private StringRedisTemplate stringRedisTemplate;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, StringRedisTemplate stringRedisTemplate) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.stringRedisTemplate = stringRedisTemplate;
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

    public String handlePhoneVerification(String phoneNumber) {
        if(memberRepository.existsByMemberPhone(phoneNumber)) {
            return null;  // 이미 등록된 전화번호
        }

        // 6자리 인증번호 생성 (예를 들어, "123456")
        String authCode = String.format("%06d", (int)(Math.random() * 1000000));

        // Redis에 인증번호 저장 (10분 유효)
        stringRedisTemplate.opsForValue().set(phoneNumber, authCode, 3, TimeUnit.MINUTES);

        return authCode;  // 인증번호 반환
    }

    public boolean verifyAuthCode(String phoneNumber, String inputAuthCode) {
        String storedAuthCode = stringRedisTemplate.opsForValue().get(phoneNumber);

        if(storedAuthCode == null) {
            return false; // 저장된 인증번호가 없음
        }

        return storedAuthCode.equals(inputAuthCode); // 입력한 인증번호와 저장된 인증번호 비교
    }

    public String handlePhoneVerificationForPasswordReset(String phoneNumber) {
        // 이미 등록된 전화번호인지 확인
        if (!memberRepository.existsByMemberPhone(phoneNumber)) {
            return null;
        }

        // 6자리 인증번호 생성
        String authCode = String.format("%06d", (int) (Math.random() * 1000000));

        // Redis에 인증번호 저장 (3분 유효)
        stringRedisTemplate.opsForValue().set(phoneNumber, authCode, 15, TimeUnit.SECONDS);

        return authCode;  // 인증번호 반환
    }

    public void changePassword(String memberPhone, String newPassword) {
        Member member = memberRepository.findByMemberPhone(memberPhone).get();
        member.setMemberPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);
    }
}
