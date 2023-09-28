package project.app.c109.backendapp.order.domain.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrderResponseDTO {
    private Integer orderSeq;
    private Integer storeSeq;
    private Integer memberSeq;
    private Integer productSeq;
    private LocalDateTime orderDate;
    private Integer orderCount;
    private Integer orderPrice;
    private Integer orderStatus;
    private Integer totalPrice;
    private String paymentMethod;
}
