package project.app.c109.backendapp.totalorderdetail.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GroupedOrderDetailResponse {
    private Integer orderDetailSeq;
    private Integer totalOrderSeq;
    private String productName;
    private String storeName;
    private Integer storeSeq;
    private Integer count;
    private Integer orderPrice;
    private Integer status;
    private LocalDateTime createdDate;

}
