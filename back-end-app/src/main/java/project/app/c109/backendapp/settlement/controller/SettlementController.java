package project.app.c109.backendapp.settlement.controller;

import com.amazonaws.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.settlement.domain.dto.SettlementSummary;
import project.app.c109.backendapp.settlement.domain.entity.Settlement;
import project.app.c109.backendapp.settlement.service.SettlementService;
import project.app.c109.backendapp.config.security.jwt.JwtUtils;

import javax.servlet.http.Cookie;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("api/v1/settlement")
public class SettlementController {

    private final SettlementService settlementService;
    private final JwtUtils jwtUtils;

    @Autowired
    public SettlementController(SettlementService settlementService, JwtUtils jwtUtils) {
        this.settlementService = settlementService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/create")
    public ResponseEntity<Settlement> createSettlement (@RequestParam Integer storeSeq, @RequestParam Integer settlementPrice) {
        Settlement settlement = settlementService.createSettlement(storeSeq, settlementPrice);
        return ResponseEntity.ok(settlement);
    }

    @GetMapping("/store")
    public ResponseEntity<SettlementSummary> getSettlementsByStore(@CookieValue(name = "jwtToken") String cookieValue) {
        Integer storeSeq = -1;

		if (cookieValue != null && cookieValue.startsWith("Bearer ")) {
			cookieValue = cookieValue.substring(7); // "Bearer " 부분을 제외한 토큰 추출
		}
		// JWT 토큰의 유효성 검사
		if (jwtUtils.validateToken(cookieValue)) {
			storeSeq = jwtUtils.getStoreSeqFromToken(cookieValue);

		if (storeSeq == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} 
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
        
        List<Settlement> settlements = settlementService.getSettlementsByStore(storeSeq);

        int settlementCount = settlements.size();
        int totalSettlementPrice = settlements.stream()
                .mapToInt(Settlement::getSettlementPrice)
                .sum();

        SettlementSummary summary = new SettlementSummary(settlementCount, totalSettlementPrice, settlements);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/store/date")
    public ResponseEntity<SettlementSummary> getSettlementsByStoreAndDate(
            @CookieValue(name = "jwtToken") String cookieValue,
            @RequestParam(name = "startDate") String startDateStr,
            @RequestParam(name = "endDate") String endDateStr
    ) {
        Integer storeSeq = -1;

		if (cookieValue != null && cookieValue.startsWith("Bearer ")) {
			cookieValue = cookieValue.substring(7); // "Bearer " 부분을 제외한 토큰 추출
		}
		// JWT 토큰의 유효성 검사
		if (jwtUtils.validateToken(cookieValue)) {
			storeSeq = jwtUtils.getStoreSeqFromToken(cookieValue);

		if (storeSeq == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} 
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

        LocalDateTime startDate = LocalDateTime.parse(startDateStr, DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime endDate = LocalDateTime.parse(endDateStr, DateTimeFormatter.ISO_DATE_TIME);

        List<Settlement> settlements = settlementService.getSettlementsByStoreAndDate(storeSeq, startDate, endDate);

        int settlementCount = settlements.size();
        int totalSettlementPrice = settlements.stream()
                .mapToInt(Settlement::getSettlementPrice)
                .sum();

        SettlementSummary summary = new SettlementSummary(settlementCount, totalSettlementPrice, settlements);
        return ResponseEntity.ok(summary);
    }
}
