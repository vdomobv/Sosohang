package project.app.c109.backendapp.keyword.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.category.domain.entity.Category;

import java.util.List;
import java.util.Optional;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Integer> {
    Optional<Keyword> findByKeywordSeqAndCategory(Integer keywordSeq, Category category);

    Keyword findByKeywordSeq(Integer keywordSeq);

    List<Keyword> findByCategory_CategorySeq(Integer categoryId);
}
