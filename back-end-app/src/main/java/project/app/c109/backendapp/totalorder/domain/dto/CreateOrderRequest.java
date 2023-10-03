package project.app.c109.backendapp.totalorder.domain.dto;

import lombok.Data;
import org.jetbrains.annotations.NotNull;

import java.util.List;

@Data
public class CreateOrderRequest {

    @NotNull
    private Integer memberSeq;

    @NotNull
    private String takerName;

    @NotNull
    private List<OrderItemDTO> orderItems;

    @Data
    public static class OrderItemDTO {
        @NotNull
        private Integer productSeq;

        @NotNull
        private Integer count;
    }
}
