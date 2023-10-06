package project.app.c109.backendapp.review.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.keyword.repository.KeywordRepository;
import project.app.c109.backendapp.review.domain.entity.Review;
import project.app.c109.backendapp.review.repository.ReviewRepository;
import project.app.c109.backendapp.reviewkeyword.entity.ReviewKeyword;
import project.app.c109.backendapp.reviewkeyword.repository.ReviewKeywordRepository;
import project.app.c109.backendapp.reviewkeyword.service.ReviewKeywordService;
import project.app.c109.backendapp.sosoticon.domain.entity.Sosoticon;
import project.app.c109.backendapp.sosoticon.repository.SosoticonRepository;

import javax.persistence.EntityNotFoundException;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final ReviewKeywordRepository reviewKeywordRepository;
    private final SosoticonRepository sosoticonRepository;

    @Autowired
    public ReviewService(SosoticonRepository sosoticonRepository, ReviewRepository reviewRepository, ReviewKeywordRepository reviewKeywordRepository) {
        this.sosoticonRepository = sosoticonRepository;
        this.reviewRepository = reviewRepository;
        this.reviewKeywordRepository = reviewKeywordRepository;
    }

    public void createReview(Integer storeSeq, Integer sosoticonSeq, List<Integer> selectedKeywordSeqList) {
        for (Integer keywordSeq : selectedKeywordSeqList) {

            ReviewKeyword reviewKeyword = reviewKeywordRepository.findByReviewKeywordSeq(keywordSeq)
                    .orElseThrow(()-> new EntityNotFoundException());

            boolean isAlready = reviewRepository.existsByStoreSeqAndReviewKeyword(storeSeq, reviewKeyword);

            if (isAlready) {
                Review review = reviewRepository.findByStoreSeqAndReviewKeyword(storeSeq, reviewKeyword);
                //    public Review findByStoreSeqAndReviewKeywordReviewKeywordSeq(Integer storeSeq, Integer reviewKeywordSeq);
                //    여기서 파라미터가 일치하지 않아서 자꾸 에러가 남. keywordSeq를 그대로 넣으면 안 되는 것이었다...흑...
                review.setReviewKeywordCount(review.getReviewKeywordCount()+1);
                reviewRepository.save(review);
            } else {
                Review review = Review.builder()
                        .storeSeq(storeSeq)
                        .reviewKeyword(reviewKeyword)
                        .reviewKeywordCount(1)
                        .build();
                reviewRepository.save(review);
            }
        }

        Sosoticon sosoticon = sosoticonRepository.findBySosoticonSeq(sosoticonSeq).get();
        sosoticon.setSosoticonReviewStatus(2);
        sosoticonRepository.save(sosoticon);
    }

    public List<Review> getReviewsByStoreSeqOrderByReviewKeywordCount(Integer storeSeq) {
        List<Review> reviews = reviewRepository.findByStoreSeq(storeSeq);
        reviews.sort(Comparator.comparing(Review::getReviewKeywordCount).reversed());
        return reviews;
    }
}