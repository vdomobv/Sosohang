package project.app.c109.backendapp.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.review.domain.entity.Review;
import project.app.c109.backendapp.review.service.ReviewService;
import java.util.List;


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
    @GetMapping("/{storeSeq}")
    public ResponseEntity<List<Review>> getReviewsByStoreSeqOrderByKeywordCount(@PathVariable Integer storeSeq) {
        List<Review> reviews = reviewService.getReviewsByStoreSeqOrderByReviewKeywordCount(storeSeq);
        return ResponseEntity.ok(reviews);
    }
}
