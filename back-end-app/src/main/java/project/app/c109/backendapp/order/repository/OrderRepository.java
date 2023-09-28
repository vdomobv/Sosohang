package project.app.c109.backendapp.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.c109.backendapp.order.domain.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    // 필요한 쿼리 메서드 추가 가능
}
