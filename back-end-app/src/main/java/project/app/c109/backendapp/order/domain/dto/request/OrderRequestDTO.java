// 주문 요청 DTO
package project.app.c109.backendapp.order.domain.dto.request;

import lombok.Data;
import java.util.List;

import java.time.LocalDateTime;

@Data
public class OrderRequestDTO {

    private Integer storeSeq;
    private Integer memberSeq;
    private Integer productSeq;
    private List<ProductOrderDTO> products;
    private List<StoreOrderDTO> storeOrders;
    private LocalDateTime orderDate;
    private Integer orderCount;
    private Integer orderPrice;
    private Integer orderStatus;
    private Integer totalPrice;
    private String paymentMethod;
}

