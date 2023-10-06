package project.app.c109.backendapp.member.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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
import project.app.c109.backendapp.sosoticon.service.NcpSensService;

import javax.annotation.PostConstruct;
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

    @Autowired
    private NcpSensService ncpSensService;

    @Autowired
    private Environment env;

    private String ncpApiUrl;
    private String ncpAccessKey;
    private String ncpSecretKey;
    private String ncpServiceId;

    @PostConstruct
    public void init() {
        ncpApiUrl = env.getProperty("ncp.apiUrl");
        ncpAccessKey = env.getProperty("ncp.accessKey");
        ncpSecretKey = env.getProperty("ncp.secretKey");
        ncpServiceId = env.getProperty("ncp.serviceId");
    }

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

//    public String handlePhoneVerification(String phoneNumber) {
//        if(memberRepository.existsByMemberPhone(phoneNumber)) { return null; }
//        String authCode = String.format("%06d", (int)(Math.random() * 1000000));
//        stringRedisTemplate.opsForValue().set(phoneNumber, authCode, 10, TimeUnit.SECONDS);
//        return authCode;
//    }

    public String handlePhoneVerification(String phoneNumber) {
        // 해당 핸드폰 번호가 이미 존재하는지 확인
        if(memberRepository.existsByMemberPhone(phoneNumber)) {
            return "이미 가입된 사용자입니다.";
        }

        // 6자리 인증 코드 생성
        String authCode = String.format("%06d", (int)(Math.random() * 1000000));

        // Redis에 인증 코드 저장 (180초 동안)
        stringRedisTemplate.opsForValue().set(phoneNumber, authCode, 180, TimeUnit.SECONDS);

        // 인증 코드를 사용자의 휴대폰 번호로 전송
        sendVerificationCodeViaSMS(phoneNumber, authCode);

        return "인증번호 전송 완료!";
    }

    private void sendVerificationCodeViaSMS(String phoneNumber, String authCode) {
        try {
            ncpSensService.sendVerificationSMS(phoneNumber, authCode);
        } catch (RuntimeException e) {
            System.err.println(e.getMessage());
            throw new RuntimeException("Failed to send SMS", e);
        }
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

    public Member getMemberByMemberSeq(Integer memberSeq) {
        Member member = memberRepository.findByMemberSeq(memberSeq).get();
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
