package project.app.c109.backendapp.settlement.domain.dto;

import lombok.Data;
import project.app.c109.backendapp.settlement.domain.entity.Settlement;

import java.util.List;

@Data
public class SettlementSummary {
    private int settlementCount;
    private int totalSettlementPrice;
    private List<Settlement> settlements;

    public SettlementSummary(int settlementCount, int totalSettlementPrice, List<Settlement> settlements) {
        this.settlementCount = settlementCount;
        this.totalSettlementPrice = totalSettlementPrice;
        this.settlements = settlements;
    }
}
