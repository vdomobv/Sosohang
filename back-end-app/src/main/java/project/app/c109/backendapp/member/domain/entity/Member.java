package project.app.c109.backendapp.member.domain.entity;

import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import project.app.c109.backendapp.member.domain.dto.MemberFormDto;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자를 직접 호출하지 못하도록 변경
@Table(name = "member")
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_seq")
    private Integer memberSeq;

    @Column(length = 50)
    private String memberNickname;

    @Column(length = 200)
    private String memberPassword;

    @Column(length = 50, unique = true)
    private String memberPhone;

    @Enumerated(EnumType.STRING)
    private MemberRole memberRole;

    // 생성자를 사용하여 필드 초기화
    @Builder
    public Member(String memberNickname, String memberPassword, String memberPhone, MemberRole memberRole) {
        this.memberNickname = memberNickname;
        this.memberPassword = memberPassword;
        this.memberPhone = memberPhone;
        this.memberRole = memberRole;
    }

    // MemberFormDto에서 Member로 변환하는 메서드
    public static Member createMember(MemberFormDto memberFormDto, PasswordEncoder passwordEncoder) {
        Member member = Member.builder()
                .memberNickname(memberFormDto.getMemberNickname())
                .memberPassword(passwordEncoder.encode(memberFormDto.getMemberPassword()))
                .memberPhone(memberFormDto.getMemberPhone())
                .memberRole(MemberRole.MEMBER)
                .build();
        return member;
    }
}
