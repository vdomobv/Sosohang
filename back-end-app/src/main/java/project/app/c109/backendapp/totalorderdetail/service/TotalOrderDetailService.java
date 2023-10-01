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

    public Map<Integer, Map<Integer, List<GroupedOrderDetailResponse>>> getGroupedOrderDetailsByMemberSeq(Integer memberSeq) {
        List<TotalOrderDetail> totalOrderDetails = totalOrderDetailRepository.findByMemberSeqOrderByTotalOrderSeqDesc(memberSeq);

        // 그룹화된 주문 데이터를 담을 맵 초기화
        Map<Integer, Map<Integer, List<GroupedOrderDetailResponse>>> groupedOrderDetails = new TreeMap<>(Comparator.reverseOrder());

        // totalOrderDetails를 순회하면서 그룹화된 데이터 구성
        for (TotalOrderDetail totalOrderDetail : totalOrderDetails) {
            Integer totalOrderSeq = totalOrderDetail.getTotalOrderSeq();
            Integer storeSeq = totalOrderDetail.getStoreSeq();

            GroupedOrderDetailResponse groupedDetail = new GroupedOrderDetailResponse();
            groupedDetail.setOrderDetailSeq(totalOrderDetail.getOrderDetailSeq());
            groupedDetail.setTotalOrderSeq(totalOrderSeq);
            groupedDetail.setProductName(totalOrderDetail.getProduct().getProductName());
            groupedDetail.setStoreName(totalOrderDetail.getProduct().getStore().getStoreName());
            groupedDetail.setStoreSeq(storeSeq);
            groupedDetail.setCount(totalOrderDetail.getCount());
            groupedDetail.setOrderPrice(totalOrderDetail.getOrderPrice());
            groupedDetail.setStatus(totalOrderDetail.getStatus());
            groupedDetail.setCreatedDate(totalOrderDetail.getCreatedDate());

            // 그룹화된 데이터를 맵에 추가
            groupedOrderDetails
                    .computeIfAbsent(totalOrderSeq, k -> new HashMap<>())
                    .computeIfAbsent(storeSeq, k -> new ArrayList<>())
                    .add(groupedDetail);
        }

        return groupedOrderDetails;
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
