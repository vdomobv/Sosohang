package project.app.c109.backendapp.totalorder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.product.domain.entity.Product;
import project.app.c109.backendapp.product.repository.ProductRepository;
import project.app.c109.backendapp.totalorder.domain.dto.CreateOrderRequest;
import project.app.c109.backendapp.totalorder.domain.entity.TotalOrder;
import project.app.c109.backendapp.totalorder.repository.TotalOrderRepository;
import project.app.c109.backendapp.totalorderdetail.domain.entity.TotalOrderDetail;
import project.app.c109.backendapp.totalorderdetail.repository.TotalOrderDetailRepository;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TotalOrderService {
    private final TotalOrderRepository totalOrderRepository;

    private  final ProductRepository productRepository;

    private final TotalOrderDetailRepository totalOrderDetailRepository;

    @Autowired
    public TotalOrderService (TotalOrderDetailRepository totalOrderDetailRepository, ProductRepository productRepository, TotalOrderRepository totalOrderRepository) {
        this.totalOrderDetailRepository = totalOrderDetailRepository;
        this.productRepository = productRepository;
        this.totalOrderRepository = totalOrderRepository;
    }

    public TotalOrder createOrder (CreateOrderRequest request) {
        Integer memberSeq = request.getMemberSeq();
        Integer totalPrice = 0;
        LocalDateTime now = LocalDateTime.now();
        String takerName = request.getTakerName();

        TotalOrder totalOrder = TotalOrder.builder()
                .memberSeq(memberSeq)
                .totalPrice(totalPrice)
                .build();

        totalOrder = totalOrderRepository.save(totalOrder);

        List<CreateOrderRequest.OrderItemDTO> orderItems = request.getOrderItems();

        for (CreateOrderRequest.OrderItemDTO orderItemDTO : orderItems) {
            Integer productSeq = orderItemDTO.getProductSeq();
            Integer count = orderItemDTO.getCount();
            Product product = productRepository.findByProductSeq(productSeq)
                    .orElseThrow(() -> new EntityNotFoundException());
            Integer storeSeq = product.getStore().getStoreSeq();
            Integer productPrice = product.getProductPrice();
            Double tmpPrice = count * productPrice * (1 - product.getProductDcrate());
            Integer orderPrice = tmpPrice.intValue();

            totalPrice += orderPrice;
            TotalOrderDetail totalOrderDetail = TotalOrderDetail.builder()
                    .totalOrderSeq(totalOrder.getTotalOrderSeq())
                    .product(product)
                    .count(count)
                    .storeSeq(storeSeq)
                    .productPrice(productPrice)
                    .orderPrice(orderPrice)
                    .status(0)
                    .memberSeq(memberSeq)
                    .createdDate(now)
                    .takerName(takerName)
                    .build();
            totalOrderDetailRepository.save(totalOrderDetail);
        }
        totalOrder.setTotalPrice(totalPrice);
        return totalOrderRepository.save(totalOrder);
    }
}
