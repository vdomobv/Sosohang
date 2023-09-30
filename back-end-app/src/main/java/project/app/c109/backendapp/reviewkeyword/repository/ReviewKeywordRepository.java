package project.app.c109.backendapp.reviewkeyword.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.reviewkeyword.entity.ReviewKeyword;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, Integer> {
    public List<ReviewKeyword> findByCategorySeq(Integer categorySeq);
    Optional<ReviewKeyword> findByReviewKeywordSeq(Integer reviewKeywordSeq);
}
