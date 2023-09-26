package project.app.c109.backendapp.cart.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_seq")
    private Long cartSeq;

    @Column(name = "member_seq", nullable = false)
    private Long memberSeq;

    @Column(name = "product_seq", nullable = false)
    private Long productSeq;

    @Column(name = "store_seq", nullable = false)
    private Long storeSeq;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    // Getter and Setter methods

    public Long getCartSeq() {
        return cartSeq;
    }

    public void setCartSeq(Long cartSeq) {
        this.cartSeq = cartSeq;
    }

    public Long getMemberSeq() {
        return memberSeq;
    }

    public void setMemberSeq(Long memberSeq) {
        this.memberSeq = memberSeq;
    }

    public Long getProductSeq() {
        return productSeq;
    }

    public void setProductSeq(Long productSeq) {
        this.productSeq = productSeq;
    }

    public Long getStoreSeq() {
        return storeSeq;
    }

    public void setStoreSeq(Long storeSeq) {
        this.storeSeq = storeSeq;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
