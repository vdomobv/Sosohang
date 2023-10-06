package project.app.c109.backendapp.review.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import project.app.c109.backendapp.review.domain.entity.Review;
import project.app.c109.backendapp.reviewkeyword.entity.ReviewKeyword;

import java.util.List;
import java.util.Optional;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    public List<Review> findByStoreSeq(Integer storeSeq);

    public Review findByStoreSeqAndReviewKeyword(Integer storeSeq, ReviewKeyword reviewKeyword);
//    public Review findByStoreSeqAndReviewKeywordReviewKeywordSeq(Integer storeSeq, Integer reviewKeywordSeq);

    boolean existsByStoreSeqAndReviewKeyword(Integer storeSeq, ReviewKeyword reviewKeyword);
}