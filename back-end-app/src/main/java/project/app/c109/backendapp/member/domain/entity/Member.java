package project.app.c109.backendapp.member.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자를 직접 호출하지 못하도록 변경
@Table(name = "member")
@Getter
@Builder
@AllArgsConstructor
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

}
