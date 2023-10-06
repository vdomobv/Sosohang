package project.app.c109.backendapp.totalorderdetail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.totalorder.controller.TotalOrderController;
import project.app.c109.backendapp.totalorderdetail.domain.dto.GroupedOrderDetailResponse;
import project.app.c109.backendapp.totalorderdetail.domain.entity.TotalOrderDetail;
import project.app.c109.backendapp.totalorderdetail.service.TotalOrderDetailService;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("api/v1/total-order-detail")
public class TotalOrderDetailController {

    private final TotalOrderDetailService totalOrderDetailService;

    @Autowired
    public TotalOrderDetailController (TotalOrderDetailService totalOrderDetailService) {
        this.totalOrderDetailService = totalOrderDetailService;
    }

//    @GetMapping("/{memberSeq}")
//    public List<TotalOrderDetail> getTotalOrderDetailsByMember(@PathVariable Integer memberSeq) {
//        return totalOrderDetailService.getTotalOrderDetailsByMemberSeq(memberSeq);
//    }

    @GetMapping("/{memberSeq}")
    public List<TotalOrderDetail> getGroupedTotalOrderDetailsByMember(@PathVariable Integer memberSeq) {
        List<TotalOrderDetail> groupedOrderDetails = totalOrderDetailService.getGroupedOrderDetailsByMemberSeq(memberSeq);
        return groupedOrderDetails;
    }

    @PutMapping("/cancel/{totalOrderSeq}/{storeSeq}")
    public ResponseEntity<List<TotalOrderDetail>> cancelOrderItem(@PathVariable Integer totalOrderSeq, @PathVariable Integer storeSeq) {
        List<TotalOrderDetail> response = totalOrderDetailService.cancelOrderDetailsGroupedByStoreTotalOrder(totalOrderSeq, storeSeq);
        return ResponseEntity.ok(response);
    }

}
