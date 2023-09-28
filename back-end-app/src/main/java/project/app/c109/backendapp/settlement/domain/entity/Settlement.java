package project.app.c109.backendapp.settlement.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.app.c109.backendapp.store.domain.entity.Store;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "settlement")
public class Settlement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "settlement_seq")
    private Integer settlementSeq;

    @ManyToOne
    @JoinColumn(name = "store_seq")
    private Store store;

    @Column(name = "settlement_added_date")
    private LocalDate settlementAddedDate;

    @Column(name = "settlement_price")
    private Integer settlementPrice;
}
