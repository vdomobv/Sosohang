package project.app.c109.backendapp.review.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.review.domain.entity.Review;
import project.app.c109.backendapp.review.repository.ReviewRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void createReview(Integer storeSeq, List<Integer> selectedKeywordSeqList, Integer categorySeq) {
        for (Integer keywordSeq : selectedKeywordSeqList) {
            Review review = Review.builder()
                    .storeSeq(storeSeq)
                    .keywordSeq(keywordSeq)
                    .categorySeq(categorySeq)
                    .build();
            reviewRepository.save(review);
        }
    }

    public Map<Integer, Long> getKeywordReviewCounts(Integer storeSeq) {
        // 상점별 리뷰 목록을 가져와 키워드 별 리뷰 갯수를 계산합니다.
        List<Review> reviews = reviewRepository.findByStoreSeq(storeSeq);
        return reviews.stream()
                .collect(Collectors.groupingBy(Review::getKeywordSeq, Collectors.counting()));
    }
}