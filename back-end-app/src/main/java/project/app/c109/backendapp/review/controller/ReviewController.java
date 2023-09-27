package project.app.c109.backendapp.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.review.domain.entity.Review;
import project.app.c109.backendapp.review.service.ReviewService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createReview(@RequestParam Integer storeSeq, @RequestParam List<Integer> selectedKeywordSeqList, @RequestParam Integer categorySeq) {
        reviewService.createReview(storeSeq, selectedKeywordSeqList, categorySeq);
        return ResponseEntity.ok("Review created successfully.");
    }

    @GetMapping("")
    public ResponseEntity<Map<Integer, Long>> getReviewsByStoreSeq(Integer storeSeq) {
        Map<Integer, Long> keywordReviewCounts = reviewService.getKeywordReviewCounts(storeSeq);
        return ResponseEntity.ok(keywordReviewCounts);
    }
}
