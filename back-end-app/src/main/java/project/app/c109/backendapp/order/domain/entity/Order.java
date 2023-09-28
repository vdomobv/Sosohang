package project.app.c109.backendapp.order.domain.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import project.app.c109.backendapp.product.domain.entity.Product;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.category.domain.entity.Category;





import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_seq")
    private Integer orderSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_seq")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_seq")
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_seq")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_seq")
    private Product product;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "order_count")
    private Integer orderCount;

    @Column(name = "order_price")
    private Integer orderPrice;

    @Column(name = "order_status")
    private Integer orderStatus;  // 1. 정상, 2. 주문취소

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "payment_method")
    private String paymentMethod;

    // 연관관계 설정 등 추가 작업 진행 가능
}
