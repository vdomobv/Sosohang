package project.app.c109.backendapp.cart.domain.dto.response;

import lombok.Data;

@Data
public class CartResponseDTO {
    private Integer cartSeq;
    private Integer memberSeq;
    private Integer productSeq;
    private Integer quantity;
}
