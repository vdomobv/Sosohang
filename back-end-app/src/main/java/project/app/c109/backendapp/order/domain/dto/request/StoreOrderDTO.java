package project.app.c109.backendapp.order.domain.dto.request;

import lombok.Data;
import java.util.List;
@Data
public class StoreOrderDTO {
    private Integer storeSeq;
    private List<ProductOrderDTO> products;
}
