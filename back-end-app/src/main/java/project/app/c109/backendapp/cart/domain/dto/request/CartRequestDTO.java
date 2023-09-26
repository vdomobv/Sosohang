package project.app.c109.backendapp.cart.domain.dto.request;

import javax.validation.constraints.NotNull;

public class CartRequestDTO {

    @NotNull
    private Long memberSeq;
    @NotNull
    private Long productSeq;
    @NotNull
    private Long storeSeq;
    @NotNull
    private Integer quantity;

    // Getter and Setter methods

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
