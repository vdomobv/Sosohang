package project.app.c109.backendapp.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.order.domain.dto.request.OrderRequestDTO;
import project.app.c109.backendapp.order.domain.dto.response.OrderResponseDTO;
import project.app.c109.backendapp.order.service.OrderService;

import java.util.List;


@RestController
@RequestMapping("/api/v1/{userId}/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // 주문 상세 조회
    @GetMapping("/{orderSeq}")
    public ResponseEntity<OrderResponseDTO> getOrderDetails(@PathVariable Integer orderSeq) {
        return ResponseEntity.ok(orderService.getOrderDetails(orderSeq));
    }
    // 특정 멤버가 여러 상점에서 주문 추가
    @PostMapping
    public ResponseEntity<List<OrderResponseDTO>> placeOrders(@PathVariable Integer userId, @RequestBody List<OrderRequestDTO> orderRequests) {
        List<OrderResponseDTO> orderResponses = orderService.placeOrders(userId, orderRequests);
        return ResponseEntity.ok(orderResponses);
    }

//    @PostMapping("/{storeId}")
//    public ResponseEntity<List<OrderResponseDTO>> placeOrder(@PathVariable Integer userId, @PathVariable Integer storeId, @RequestBody List<OrderRequestDTO> orderRequests) {
//        List<OrderResponseDTO> orderResponses = orderService.placeOrder(userId, storeId, orderRequests);
//        return ResponseEntity.ok(orderResponses);
//    }
    // 특정 유저의 모든 주문 조회
    @GetMapping("/all")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrdersByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(orderService.getAllOrdersByUser(userId));
    }

    // 특정 유저, 특정 상점에서의 모든 주문 조회
    @GetMapping("/{storeId}")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrdersByUserAndStore(@PathVariable Integer userId, @PathVariable Integer storeId) {
        return ResponseEntity.ok(orderService.getAllOrdersByUserAndStore(userId, storeId));
    }
    // 주문 취소
    @PutMapping("/cancel/{orderSeq}")
    public ResponseEntity<Void> cancelOrder(@PathVariable Integer orderSeq) {
        orderService.cancelOrder(orderSeq);
        return ResponseEntity.ok().build();
    }
    // 특정 멤버가 여러 상점에서 주문 추가
//    @PostMapping("/bulk")
//    public ResponseEntity<List<OrderResponseDTO>> placeBulkOrders(@PathVariable Integer userId, @RequestBody List<OrderRequestDTO> orderRequests) {
//        List<OrderResponseDTO> orderResponses = orderService.placeBulkOrders(userId, orderRequests);
//        return ResponseEntity.ok(orderResponses);
//    }

}
