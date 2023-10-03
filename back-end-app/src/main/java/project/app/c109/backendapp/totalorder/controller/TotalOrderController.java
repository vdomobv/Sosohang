package project.app.c109.backendapp.totalorder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.app.c109.backendapp.totalorder.domain.dto.CreateOrderRequest;
import project.app.c109.backendapp.totalorder.domain.entity.TotalOrder;
import project.app.c109.backendapp.totalorder.service.TotalOrderService;

@RestController
@RequestMapping("api/v1/total-order")
public class TotalOrderController {

    private final TotalOrderService totalOrderService;

    public TotalOrderController (TotalOrderService totalOrderService) {
        this.totalOrderService = totalOrderService;
    }

    @PostMapping("/create")
    public ResponseEntity<TotalOrder> createOrder(@RequestBody CreateOrderRequest request) {
        TotalOrder totalOrder = totalOrderService.createOrder(request);
        return ResponseEntity.ok(totalOrder);
    }

}
