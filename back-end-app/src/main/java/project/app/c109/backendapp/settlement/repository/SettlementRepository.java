package project.app.c109.backendapp.settlement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.settlement.domain.entity.Settlement;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SettlementRepository extends JpaRepository<Settlement, Integer> {
    List<Settlement> findByStoreStoreSeq(Integer storeSeq);
    List<Settlement> findByStoreStoreSeqAndSettlementAddedDateBetween(Integer storeSeq, LocalDateTime startDate, LocalDateTime endDate);
}
