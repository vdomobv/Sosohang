package project.app.c109.backendapp.cart.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.product.domain.entity.Product;
import project.app.c109.backendapp.store.domain.entity.Store;

import javax.persistence.*;

@Data
@Entity
@Builder
@Table(name = "cart")
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_seq")
    private Integer cartSeq;

    @ManyToOne
    @JoinColumn(name = "member_seq", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_seq", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "store_seq")
    private Store store;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

}
