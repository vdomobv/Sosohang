package project.app.c109.backendapp.dib.domain.entity;

import lombok.*;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.member.domain.entity.Member;

import javax.persistence.*;

@Data
@Entity
@Table(name = "dib")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Dib {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dib_seq")
    private Integer dibSeq;

    @ManyToOne
    @JoinColumn(name = "member_seq", referencedColumnName = "member_seq")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "store_seq", referencedColumnName = "store_seq")
    private Store store;
}
