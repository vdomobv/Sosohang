package project.app.c109.backendapp.cart.domain.dto.response;

public class CartResponseDTO {
    private Long cartSeq;
    private Long memberSeq;
    private Long productSeq;
    private Long storeSeq;
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
