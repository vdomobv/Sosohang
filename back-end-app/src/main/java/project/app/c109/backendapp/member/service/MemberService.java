package project.app.c109.backendapp.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.member.domain.dto.SignUpFormDto;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.domain.entity.MemberRole;
import project.app.c109.backendapp.member.repository.MemberRepository;

import java.util.Optional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Member createMember(SignUpFormDto signUpFormDto) {
        // PasswordEncoder를 사용하여 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(signUpFormDto.getMemberPassword());

        // Member 엔터티 생성
        Member member = Member.builder()
                .memberNickname(signUpFormDto.getMemberNickname())
                .memberPassword(encodedPassword) // 암호화된 비밀번호 설정
                .memberPhone(signUpFormDto.getMemberPhone())
                .memberRole(MemberRole.MEMBER)
                .build();

        // 생성된 회원 엔터티를 저장
        return saveMember(member);
    }

    public Member saveMember(Member member) {
        validateDuplicateMember(member);
        return memberRepository.save(member);
    }

    private void validateDuplicateMember(Member member) {
        Optional<Member> findMember = memberRepository.findByMemberPhone(member.getMemberPhone());
        if (findMember.isPresent()) {
            throw new IllegalStateException("이미 가입된 회원입니다.");
        }
    }
}

