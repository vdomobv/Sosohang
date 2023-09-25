package project.app.c109.backendapp.stamp.domain.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.store.domain.entity.Store;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "stamp")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자를 직접 호출하지 못하도록 변경
@AllArgsConstructor
public class Stamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stamp_seq")
    private Integer stampSeq;

    @CreatedDate
    @Column(name = "stamp_added_date", updatable = false)
    private LocalDateTime stampAddedDate;

    @Column(name = "stamp_used_date")
    private LocalDateTime stampUsedDate;

    @Column(name = "stamp_status")
    private Integer stampStatus;

    @ManyToOne
    @JoinColumn(name = "member_seq")
    private Member member;

    @Column(name = "store_seq") // Integer 형식의 외래키
    private Integer storeSeq;

//    @ManyToOne
//    @JoinColumn(name = "store_seq")
//    private Store store;
}
