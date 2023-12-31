package project.app.c109.backendapp.settlement.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.app.c109.backendapp.store.domain.entity.Store;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;

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
    @JsonIgnore
    @JoinColumn(name = "store_seq")
    private Store store;

    @Column(name = "settlement_added_date")
    private LocalDateTime settlementAddedDate;

    @Column(name = "settlement_price")
    private Integer settlementPrice;
}
