package project.app.c109.backendapp.settlement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.settlement.domain.entity.Settlement;
import project.app.c109.backendapp.settlement.repository.SettlementRepository;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;

import javax.persistence.EntityExistsException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SettlementService {


    private final SettlementRepository settlementRepository;
    private final StoreRepository storeRepository;

    @Autowired
    public SettlementService(SettlementRepository settlementRepository, StoreRepository storeRepository) {
        this.settlementRepository = settlementRepository;
        this.storeRepository = storeRepository;
    }


    public Settlement createSettlement(Integer storeSeq, Integer settlementPrice) {
        Store store = storeRepository.findByStoreSeq(storeSeq)
                .orElseThrow(() -> new EntityExistsException());

        LocalDateTime now = LocalDateTime.now();

        Settlement settlement = Settlement.builder()
                .store(store)
                .settlementAddedDate(now)
                .settlementPrice(settlementPrice)
                .build();
        return settlementRepository.save(settlement);
    }

    public List<Settlement> getSettlementsByStore(Integer storeSeq) {
        return settlementRepository.findByStoreStoreSeq(storeSeq);
    }
    public List<Settlement> getSettlementsByStoreAndDate(Integer storeSeq, LocalDateTime startDate, LocalDateTime endDate) {
        return settlementRepository.findByStoreStoreSeqAndSettlementAddedDateBetween(storeSeq, startDate, endDate);
    }
}
