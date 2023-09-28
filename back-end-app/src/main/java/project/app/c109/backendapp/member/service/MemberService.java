package project.app.c109.backendapp.member.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.config.security.jwt.JwtUtils;
import project.app.c109.backendapp.member.domain.dto.request.MemberLoginRequest;
import project.app.c109.backendapp.member.domain.dto.request.MemberRegisterRequest;
import project.app.c109.backendapp.member.domain.dto.response.LoginResponse;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.repository.MemberRepository;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
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

    public Member register(MemberRegisterRequest memberRegisterRequest) {

        if (memberRepository.existsByMemberPhone(memberRegisterRequest.getMemberPhone())) {
            throw new EntityExistsException();
        }

        Member member = Member.builder()
                .memberNickname(memberRegisterRequest.getMemberNickname())
                .memberPassword(passwordEncoder.encode(memberRegisterRequest.getMemberPassword()))
                .memberPhone(memberRegisterRequest.getMemberPhone())
                .memberRole("MEMBER")
                .build();
        return memberRepository.save(member);

    }

    public LoginResponse login(MemberLoginRequest memberLoginRequest) {
        Member member = memberRepository.findByMemberPhone(memberLoginRequest.getMemberPhone())
                .orElseThrow(() -> new EntityNotFoundException("Invalid credentials."));
        if (!passwordEncoder.matches(memberLoginRequest.getMemberPassword(), member.getMemberPassword())) {
            throw new BadCredentialsException("Invalid credentials.");
        }
        String token = jwtUtils.generateToken(member.getMemberPhone());
        return new LoginResponse(token, member);
    }

    public String handlePhoneVerification(String phoneNumber) {
        if(memberRepository.existsByMemberPhone(phoneNumber)) { return null; }
        String authCode = String.format("%06d", (int)(Math.random() * 1000000));
        stringRedisTemplate.opsForValue().set(phoneNumber, authCode, 10, TimeUnit.SECONDS);
        return authCode;
    }

    public boolean verifyAuthCode(String phoneNumber, String inputAuthCode) {
        String storedAuthCode = stringRedisTemplate.opsForValue().get(phoneNumber);
        if(storedAuthCode == null) {
            return false;
        }
        return storedAuthCode.equals(inputAuthCode);
    }

    public String handlePhoneVerificationForPasswordReset(String phoneNumber) {
        if (!memberRepository.existsByMemberPhone(phoneNumber)) {
            return null;
        }
        String authCode = String.format("%06d", (int) (Math.random() * 1000000));
        stringRedisTemplate.opsForValue().set(phoneNumber, authCode, 3, TimeUnit.MINUTES);
        return authCode;
    }

    public void changePassword(String memberPhone, String newPassword) {
        Member member = memberRepository.findByMemberPhone(memberPhone).get();
        member.setMemberPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);
    }

    public Member getMemberByMemberPhone(String memberPhone) {
        Member member = memberRepository.findByMemberPhone(memberPhone).get();
        return member;
    }

    public Member updateMemberInfo(Integer memberSeq, String newMemberNickname) {
        Member member = memberRepository.findByMemberSeq(memberSeq)
                        .orElseThrow(()->new EntityNotFoundException());
        member.setMemberNickname(newMemberNickname);
        memberRepository.save(member);
        return member;
    }
}
