package project.app.c109.backendapp.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.review.domain.entity.Review;
import project.app.c109.backendapp.review.service.ReviewService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createReview(@RequestParam Integer storeSeq, @RequestParam List<Integer> selectedKeywordSeqList) {
        reviewService.createReview(storeSeq, selectedKeywordSeqList);
        return ResponseEntity.ok("Review created successfully.");
    }

    @GetMapping("")
    public ResponseEntity<List<ReviewService.KeywordReviewCount>> getReviewsByStoreSeq(Integer storeSeq) {
        List<ReviewService.KeywordReviewCount> keywordReviewCounts = reviewService.getKeywordReviewCounts(storeSeq);
        return ResponseEntity.ok(keywordReviewCounts);
    }

}
