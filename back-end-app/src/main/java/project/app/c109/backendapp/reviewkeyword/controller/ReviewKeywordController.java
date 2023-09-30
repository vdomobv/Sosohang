package project.app.c109.backendapp.reviewkeyword.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.app.c109.backendapp.reviewkeyword.entity.ReviewKeyword;
import project.app.c109.backendapp.reviewkeyword.repository.ReviewKeywordRepository;
import project.app.c109.backendapp.reviewkeyword.service.ReviewKeywordService;

import java.util.List;

@RestController
@RequestMapping("api/v1/review-keyword")
public class ReviewKeywordController {

    private final ReviewKeywordService reviewKeywordService;

    @Autowired
    public ReviewKeywordController (ReviewKeywordService reviewKeywordService) {
        this.reviewKeywordService = reviewKeywordService;
    }

    @GetMapping("/{categorySeq}")
    public ResponseEntity<List<ReviewKeyword>> getReviewKeywordByCategory (@PathVariable Integer categorySeq) {
        List<ReviewKeyword> reviewKeywordListByCategorySeq = reviewKeywordService.findByCategorySeq(categorySeq);
        return ResponseEntity.ok(reviewKeywordListByCategorySeq);
    }
}
