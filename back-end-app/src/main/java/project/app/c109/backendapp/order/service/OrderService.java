package project.app.c109.backendapp.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.order.domain.dto.request.OrderRequestDTO;
import project.app.c109.backendapp.order.domain.dto.response.OrderResponseDTO;
import project.app.c109.backendapp.order.domain.dto.request.ProductOrderDTO;
import project.app.c109.backendapp.order.domain.dto.request.StoreOrderDTO;
import project.app.c109.backendapp.order.domain.entity.Order;
import project.app.c109.backendapp.order.repository.OrderRepository;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.repository.MemberRepository;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StoreRepository storeRepository;


    public OrderResponseDTO getOrderDetails(Integer orderSeq) {
        Order order = orderRepository.findById(orderSeq).orElseThrow(() -> new RuntimeException("Order not found"));

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setOrderSeq(order.getOrderSeq());
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
        // Member, Store 인스턴스를 데이터베이스에서 찾기
        Member member = memberRepository.findById(orderRequest.getMemberSeq()).orElseThrow(() -> new RuntimeException("Member not found"));
        Store store = storeRepository.findById(orderRequest.getStoreSeq()).orElseThrow(() -> new RuntimeException("Store not found"));

        Order order = new Order();
        order.setMember(member);
        order.setStore(store);

        order.setOrderDate(orderRequest.getOrderDate());
        order.setOrderCount(orderRequest.getOrderCount());
        order.setOrderPrice(orderRequest.getOrderPrice());
        order.setOrderStatus(orderRequest.getOrderStatus());
        order.setTotalPrice(orderRequest.getTotalPrice());
        order.setPaymentMethod(orderRequest.getPaymentMethod());

        order = orderRepository.save(order);


        OrderResponseDTO response = new OrderResponseDTO();
        response.setOrderSeq(order.getOrderSeq());

        response.setMemberSeq(order.getMember().getMemberSeq());
        response.setStoreSeq(order.getStore().getStoreSeq());
        response.setProductSeq(order.getProduct().getProductSeq());

        response.setOrderDate(order.getOrderDate());
        response.setOrderCount(order.getOrderCount());
        response.setOrderPrice(order.getOrderPrice());
        response.setOrderStatus(order.getOrderStatus());
        response.setTotalPrice(order.getTotalPrice());
        response.setPaymentMethod(order.getPaymentMethod());

        return response;
    }

    // 특정 유저의 모든 주문 조회
    public List<OrderResponseDTO> getAllOrdersByUser(Integer memberSeq) {
        List<Order> orders = orderRepository.findByMemberMemberSeq(memberSeq);
        return orders.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // 주문 취소
    public void cancelOrder(Integer orderSeq) {
        Order order = orderRepository.findById(orderSeq).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(2);  // 주문 취소 상태로 설정
        orderRepository.save(order);
    }

    private OrderResponseDTO convertToResponseDTO(Order order) {
        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setOrderSeq(order.getOrderSeq());
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
    public List<OrderResponseDTO> placeOrders(Integer userId, List<OrderRequestDTO> orderRequests) {
        return orderRequests.stream()
                .map(orderRequest -> {
                    orderRequest.setMemberSeq(userId);
                    return createOrder(orderRequest);
                })
                .collect(Collectors.toList());
    }

//    public List<OrderResponseDTO> placeOrder(Integer userId, Integer storeId, List<OrderRequestDTO> orderRequests) {
//        return orderRequests.stream()
//                .map(orderRequest -> {
//                    orderRequest.setMemberSeq(userId);
//                    orderRequest.setStoreSeq(storeId);
//                    return createOrder(orderRequest);
//                })
//                .collect(Collectors.toList());
//    }


    public List<OrderResponseDTO> getAllOrdersByUserAndStore(Integer userId, Integer storeId) {
        List<Order> orders = orderRepository.findByMemberMemberSeqAndStoreStoreSeq(userId, storeId);
        return orders.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

//    public List<OrderResponseDTO> placeBulkOrders(Integer userId, List<OrderRequestDTO> orderRequests) {
//        return orderRequests.stream()
//                .map(orderRequest -> placeOrder(userId, orderRequest.getStoreSeq(), orderRequest))
//                .collect(Collectors.toList());
//    }
    public List<OrderResponseDTO> placeMultipleOrders(Integer userId, OrderRequestDTO orderRequest) {
        List<OrderResponseDTO> responses = new ArrayList<>();

        for (StoreOrderDTO storeOrder : orderRequest.getStoreOrders()) {
            Store store = storeRepository.findById(storeOrder.getStoreSeq()).orElseThrow(() -> new RuntimeException("Store not found"));
            for (ProductOrderDTO productOrder : storeOrder.getProducts()) {
                Order order = new Order();
                order.setMember(memberRepository.findById(userId).orElseThrow(() -> new RuntimeException("Member not found")));
                order.setStore(store);
                // ... 상품 관련 정보 설정 ...
                orderRepository.save(order);

                OrderResponseDTO response = convertToResponseDTO(order);
                responses.add(response);
            }
        }
        return responses;
    }
}
