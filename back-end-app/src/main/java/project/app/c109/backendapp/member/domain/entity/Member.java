package project.app.c109.backendapp.member.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
//import project.app.c109.backendapp.member.dto.MemberFormDto;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "member")
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_seq")
    private Integer member_seq;

    @Column(length = 50)
    private String member_nickname;

    @Column(length = 200)
    private String member_password;

    @Column(length = 50, unique = true)
    private String member_phone;

    @Enumerated(EnumType.STRING)
    private MemberRole member_role;

    @Builder
    public Member(String member_nickname, String member_password, String member_phone, MemberRole member_role) {
        this.member_nickname = member_nickname;
        this.member_password = member_password;
        this.member_phone = member_phone;
        this.member_role = member_role;
    }
//
//    public static Member createMember(MemberFormDto memberFormDto, PasswordEncoder passwordEncoder) {
//        return Member.builder()
//                .member_nickname(memberFormDto.getMember_nickname())
//                .member_password(passwordEncoder.encode(memberFormDto.getMember_password()))
//                .member_phone(memberFormDto.getMember_phone())
//                .member_role(MemberRole.MEMBER)
//                .build();
//    }
}
