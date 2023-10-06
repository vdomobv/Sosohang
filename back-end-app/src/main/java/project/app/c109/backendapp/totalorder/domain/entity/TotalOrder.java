package project.app.c109.backendapp.totalorder.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "total_order")
public class TotalOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "total_order_seq")
    private Integer totalOrderSeq;

    @Column
    private Integer memberSeq;

    @Column
    private Integer totalPrice;
}
