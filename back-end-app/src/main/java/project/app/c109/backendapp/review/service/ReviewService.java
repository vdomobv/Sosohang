package project.app.c109.backendapp.review.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.keyword.repository.KeywordRepository;
import project.app.c109.backendapp.review.domain.entity.Review;
import project.app.c109.backendapp.review.repository.ReviewRepository;

import java.security.Key;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final KeywordRepository keywordRepository;
    @Autowired
    public ReviewService(ReviewRepository reviewRepository, KeywordRepository keywordRepository) {
        this.reviewRepository = reviewRepository;
        this.keywordRepository = keywordRepository;
    }

    public void createReview(Integer storeSeq, List<Integer> selectedKeywordSeqList) {
        for (Integer keywordSeq : selectedKeywordSeqList) {
            Keyword keyword = keywordRepository.findByKeywordSeq(keywordSeq);
            Review review = Review.builder()
                    .storeSeq(storeSeq)
                    .keyword(keyword)
                    .build();
            reviewRepository.save(review);
        }
    }

    public class KeywordReviewCount {
        private Keyword keyword;
        private Long reviewCount;

        public KeywordReviewCount(Keyword keyword, Long reviewCount) {
            this.keyword = keyword;
            this.reviewCount = reviewCount;
        }

        public Keyword getKeyword() {
            return keyword;
        }

        public Long getReviewCount() {
            return reviewCount;
        }
    }

    public List<KeywordReviewCount> getKeywordReviewCounts(Integer storeSeq) {
        List<Review> reviews = reviewRepository.findByStoreSeq(storeSeq);
        Map<Keyword, Long> keywordReviewCounts = reviews.stream()
                .collect(Collectors.groupingBy(Review::getKeyword, Collectors.counting()));

        List<KeywordReviewCount> sortedKeywordReviewCounts = keywordReviewCounts.entrySet()
                .stream()
                .sorted(Map.Entry.<Keyword, Long>comparingByValue().reversed())
                .map(entry -> new KeywordReviewCount(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        return sortedKeywordReviewCounts;
    }
}