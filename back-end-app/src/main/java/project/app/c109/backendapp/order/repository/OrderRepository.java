package project.app.c109.backendapp.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.c109.backendapp.order.domain.entity.Order;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.product.domain.entity.Product;


import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByMemberMemberSeqAndStoreStoreSeq(Integer memberSeq, Integer storeSeq);

    List<Order> findByMemberMemberSeq(Integer memberSeq);
    // 필요한 다른 쿼리 메서드를 추가하세요.
    // 예: 주문 상태에 따른 주문 조회, 특정 기간 동안의 주문 조회 등
}
