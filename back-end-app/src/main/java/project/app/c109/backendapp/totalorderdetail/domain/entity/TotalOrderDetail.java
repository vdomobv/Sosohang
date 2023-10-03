package project.app.c109.backendapp.totalorderdetail.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.app.c109.backendapp.product.domain.entity.Product;
import project.app.c109.backendapp.totalorder.domain.entity.TotalOrder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_detail")
public class TotalOrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_detail_seq")
    private Integer orderDetailSeq;

    @Column
    private Integer totalOrderSeq;

    @ManyToOne
    @JoinColumn(name = "product_seq" , referencedColumnName = "product_seq")
    private Product product;

    @Column
    LocalDateTime createdDate;

    @Column
    LocalDateTime canceledDate;

    @Column
    private Integer storeSeq;

    @Column
    private Integer memberSeq;

    @Column
    private Integer count;

    @Column
    private Integer productPrice;

    @Column
    private Integer orderPrice;

    @Column
    private Integer status;
}
