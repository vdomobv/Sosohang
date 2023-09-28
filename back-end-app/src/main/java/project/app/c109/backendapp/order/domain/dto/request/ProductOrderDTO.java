package project.app.c109.backendapp.order.domain.dto.request;

import lombok.Data;
@Data
public class ProductOrderDTO {
    private Integer productSeq;
    private Integer quantity;
    private Integer price; // 각 상품에 대한 가격
}