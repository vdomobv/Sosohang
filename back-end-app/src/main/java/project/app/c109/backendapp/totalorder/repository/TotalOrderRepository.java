package project.app.c109.backendapp.totalorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.totalorder.domain.entity.TotalOrder;

@Repository
public interface TotalOrderRepository extends JpaRepository<TotalOrder, Integer> {
    TotalOrder findByTotalOrderSeq(Integer totalOrderSeq);
}
