package project.app.c109.backendapp.stamp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.stamp.domain.entity.Stamp;
import project.app.c109.backendapp.stamp.service.StampService;

import javax.persistence.EntityNotFoundException;
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
            @RequestParam String memberPhone,
            @RequestParam Integer stampCount) {
        try {
            // 멤버의 존재 여부를 확인
            if (!stampService.memberExists(memberPhone)) {
                logger.error("Member not found with the provided phone number: {}", memberPhone);
                return ResponseEntity.badRequest().body("Member not found with the provided phone number.");
            }

            // 스탬프 적립 로직을 수행
            stampService.earnStamp(storeSeq, memberPhone, stampCount);

            logger.info("Stamp earned successfully for member: {} at store: {}", memberPhone, storeSeq);
            return ResponseEntity.ok("Stamp earned successfully.");
        } catch (Exception e) {
            logger.error("Error while earning stamp for member: {} at store: {}", memberPhone, storeSeq, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/use")
    public ResponseEntity<String> useStamp(
            @RequestParam String memberPhone,
            @RequestParam Integer storeSeq,
            @RequestParam Integer countForUse) {
        try {
            // 스탬프 사용 로직을 수행
            stampService.useStamp(memberPhone, storeSeq, countForUse);
            return ResponseEntity.ok("Stamp used successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/member")
    public List<Stamp> getStampByMember(@RequestParam Integer memberSeq) {
        return stampService.getStampByMember(memberSeq);
    }

    @GetMapping("/member/status")
    public List<Stamp> getStampByMemberAndStampStatus(@RequestParam Integer memberSeq, @RequestParam Integer stampStatus) {
        return stampService.getStampByMemberAndStampStatus(memberSeq, stampStatus);
    }

    @GetMapping("/{memberPhone}/{storeSeq}")
    public ResponseEntity<List<Stamp>> getStampByMemberAndStoreAndStampStatus(@PathVariable String memberPhone, @PathVariable Integer storeSeq, @RequestParam Integer stampStatus) {
        try {
            List<Stamp> stamps = stampService.getStampByMemberAndStoreAndStampStatus(memberPhone, storeSeq, stampStatus);
            return ResponseEntity.ok(stamps);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }

    }

}
