package project.app.c109.backendapp.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.order.domain.dto.request.OrderRequestDTO;
import project.app.c109.backendapp.order.domain.dto.response.OrderResponseDTO;
import project.app.c109.backendapp.order.domain.entity.Order;
import project.app.c109.backendapp.order.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public OrderResponseDTO getOrderDetails(Integer orderSeq) {
        Order order = orderRepository.findById(orderSeq).orElseThrow(() -> new RuntimeException("Order not found"));

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setOrderSeq(order.getOrderSeq());
        responseDTO.setCategorySeq(order.getCategory().getCategorySeq());
        responseDTO.setStoreSeq(order.getStore().getStoreSeq());
        responseDTO.setMemberSeq(order.getMember().getMemberSeq());
        responseDTO.setOrderDate(order.getOrderDate());
        responseDTO.setOrderCount(order.getOrderCount());
        responseDTO.setOrderPrice(order.getOrderPrice());
        responseDTO.setOrderStatus(order.getOrderStatus());
        responseDTO.setTotalPrice(order.getTotalPrice());
        responseDTO.setPaymentMethod(order.getPaymentMethod());

        return responseDTO;
    }

    public OrderResponseDTO createOrder(OrderRequestDTO orderRequest) {
        // 주문 로직 작성, 예: 주문 데이터 저장 및 응답 반환
        Order order = new Order();
        // order 데이터 셋팅
        orderRepository.save(order);

        OrderResponseDTO response = new OrderResponseDTO();
        // response 데이터 셋팅
        return response;
    }

    // 다른 서비스 메서드 추가 가능 (예: 주문 조회, 주문 취소 등)
}
