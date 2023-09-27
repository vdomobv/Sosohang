package project.app.c109.backendapp.member.domain.entity;

import lombok.*;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_seq")
    private Integer memberSeq;

    @Column(length = 50)
    private String memberNickname;

    @JsonIgnore
    @Column(length = 200)
    private String memberPassword;

    @Column(length = 50, unique = true)
    private String memberPhone;

    @Column
    private String memberRole;
}
