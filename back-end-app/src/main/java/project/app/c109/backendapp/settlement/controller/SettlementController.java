package project.app.c109.backendapp.settlement.controller;

import com.amazonaws.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.settlement.domain.dto.SettlementSummary;
import project.app.c109.backendapp.settlement.domain.entity.Settlement;
import project.app.c109.backendapp.settlement.service.SettlementService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("api/v1/settlement")
public class SettlementController {

    private final SettlementService settlementService;

    @Autowired
    public SettlementController(SettlementService settlementService) {
        this.settlementService = settlementService;
    }

    @PostMapping("/create")
    public ResponseEntity<Settlement> createSettlement (@RequestParam Integer storeSeq, @RequestParam Integer settlementPrice) {
        Settlement settlement = settlementService.createSettlement(storeSeq, settlementPrice);
        return ResponseEntity.ok(settlement);
    }

    @PostMapping("/store/{storeSeq}")
    public ResponseEntity<SettlementSummary> getSettlementsByStore(@PathVariable Integer storeSeq) {
        List<Settlement> settlements = settlementService.getSettlementsByStore(storeSeq);

        int settlementCount = settlements.size();
        int totalSettlementPrice = settlements.stream()
                .mapToInt(Settlement::getSettlementPrice)
                .sum();

        SettlementSummary summary = new SettlementSummary(settlementCount, totalSettlementPrice, settlements);
        return ResponseEntity.ok(summary);
    }

    @PostMapping("/store/{storeSeq}/date")
    public ResponseEntity<SettlementSummary> getSettlementsByStoreAndDate(
            @PathVariable Integer storeSeq,
            @RequestParam(name = "startDate") String startDateStr,
            @RequestParam(name = "endDate") String endDateStr
    ) {

        LocalDate startDate = LocalDate.parse(startDateStr, DateTimeFormatter.ISO_DATE);
        LocalDate endDate = LocalDate.parse(endDateStr, DateTimeFormatter.ISO_DATE);

        List<Settlement> settlements = settlementService.getSettlementsByStoreAndDate(storeSeq, startDate, endDate);

        int settlementCount = settlements.size();
        int totalSettlementPrice = settlements.stream()
                .mapToInt(Settlement::getSettlementPrice)
                .sum();

        SettlementSummary summary = new SettlementSummary(settlementCount, totalSettlementPrice, settlements);
        return ResponseEntity.ok(summary);
    }
}
