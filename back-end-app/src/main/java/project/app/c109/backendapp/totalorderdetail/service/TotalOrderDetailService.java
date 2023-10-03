package project.app.c109.backendapp.totalorderdetail.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.totalorder.domain.entity.TotalOrder;
import project.app.c109.backendapp.totalorder.repository.TotalOrderRepository;
import project.app.c109.backendapp.totalorderdetail.domain.dto.GroupedOrderDetailResponse;
import project.app.c109.backendapp.totalorderdetail.domain.entity.TotalOrderDetail;
import project.app.c109.backendapp.totalorderdetail.repository.TotalOrderDetailRepository;
import java.util.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TotalOrderDetailService {

    private final TotalOrderDetailRepository totalOrderDetailRepository;

    private final TotalOrderRepository totalOrderRepository;

    @Autowired
    public TotalOrderDetailService(TotalOrderRepository totalOrderRepository, TotalOrderDetailRepository totalOrderDetailRepository) {
        this.totalOrderRepository = totalOrderRepository;
        this.totalOrderDetailRepository = totalOrderDetailRepository;
    }

//    public List<TotalOrderDetail> getTotalOrderDetailsByMemberSeq(Integer memberSeq) {
//        List<TotalOrderDetail> totalOrderDetails = totalOrderDetailRepository.findByMemberSeqOrderByOrderDetailSeqDesc(memberSeq);
//        return totalOrderDetails;
//    }

    public List<TotalOrderDetail> getGroupedOrderDetailsByMemberSeq(Integer memberSeq) {
        List<TotalOrderDetail> totalOrderDetails = totalOrderDetailRepository.findByMemberSeqOrderByTotalOrderSeqDesc(memberSeq);
        return totalOrderDetails;
    }


    public List<TotalOrderDetail> cancelOrderDetailsGroupedByStoreTotalOrder(Integer totalOrderSeq, Integer storeSeq) {
        List<TotalOrderDetail> totalOrderDetails = totalOrderDetailRepository.findTotalOrderDetailsByTotalOrderSeqAndStoreSeq(totalOrderSeq, storeSeq);
        TotalOrder totalOrder = totalOrderRepository.findByTotalOrderSeq(totalOrderSeq);
        Integer totalOrderTotalPrice = totalOrder.getTotalPrice();
        LocalDateTime now = LocalDateTime.now();
        List<TotalOrderDetail> canceledOrderDetails = new ArrayList<>();

        for (TotalOrderDetail totalOrderDetail : totalOrderDetails) {
            Integer isCanceled = totalOrderDetail.getStatus();
            if (isCanceled == 0) {
                totalOrderDetail.setStatus(1);
                totalOrderDetail.setCanceledDate(now);
                totalOrderTotalPrice -= totalOrderDetail.getOrderPrice();
                totalOrderDetailRepository.save(totalOrderDetail);
                canceledOrderDetails.add(totalOrderDetail);
            }
        }
        totalOrder.setTotalPrice(totalOrderTotalPrice);
        totalOrderRepository.save(totalOrder);
        return canceledOrderDetails;
    }
}
