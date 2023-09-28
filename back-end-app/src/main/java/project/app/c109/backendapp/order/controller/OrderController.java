package project.app.c109.backendapp.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.order.domain.dto.request.OrderRequestDTO;
import project.app.c109.backendapp.order.domain.dto.response.OrderResponseDTO;
import project.app.c109.backendapp.order.service.OrderService;

@RestController
@RequestMapping("/api/app/users/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/")
    public OrderResponseDTO createOrder(@RequestBody OrderRequestDTO orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    // 필요에 따라 다른 endpoint 및 메서드 추가
    // 예: 주문 조회, 주문 수정, 주문 삭제 등
}
