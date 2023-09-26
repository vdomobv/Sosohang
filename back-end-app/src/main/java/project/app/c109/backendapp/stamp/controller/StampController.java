package project.app.c109.backendapp.stamp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.stamp.domain.entity.Stamp;
import project.app.c109.backendapp.stamp.service.StampService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stamp")
public class StampController {

    private final StampService stampService;
    private static final Logger logger = LoggerFactory.getLogger(StampController.class);

    @Autowired
    public StampController(StampService stampService) {
        this.stampService = stampService;
    }

    @PostMapping("/earn")
    public ResponseEntity<String> earnStamp(
            @RequestParam Integer storeSeq,
            @RequestParam String memberPhone) {

        try {
            // 멤버의 존재 여부를 확인
            if (!stampService.memberExists(memberPhone)) {
                logger.error("Member not found with the provided phone number: {}", memberPhone);
                return ResponseEntity.badRequest().body("Member not found with the provided phone number.");
            }

            // 스탬프 적립 로직을 수행
            stampService.earnStamp(storeSeq, memberPhone);

            logger.info("Stamp earned successfully for member: {} at store: {}", memberPhone, storeSeq);
            return ResponseEntity.ok("Stamp earned successfully.");
        } catch (Exception e) {
            logger.error("Error while earning stamp for member: {} at store: {}", memberPhone, storeSeq, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/use")
    public ResponseEntity<String> useStamp(
            @RequestParam Integer stampSeq) {

        try {
            // 스탬프 사용 로직을 수행
            stampService.useStamp(stampSeq);

            logger.info("Stamp used successfully for stampSeq: {}", stampSeq);
            return ResponseEntity.ok("Stamp used successfully.");
        } catch (Exception e) {
            logger.error("Error while using stamp for stampSeq: {}", stampSeq, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{memberId}")
    public List<Stamp> getStampByMember(@PathVariable Integer memberId) {
        return stampService.getStampByMember(memberId);
    }
}
