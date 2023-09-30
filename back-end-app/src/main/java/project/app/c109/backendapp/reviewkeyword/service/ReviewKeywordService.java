package project.app.c109.backendapp.reviewkeyword.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.reviewkeyword.entity.ReviewKeyword;
import project.app.c109.backendapp.reviewkeyword.repository.ReviewKeywordRepository;

import java.util.List;

@Service
public class ReviewKeywordService {
    private final ReviewKeywordRepository reviewKeywordRepository;

    @Autowired
    public ReviewKeywordService(ReviewKeywordRepository reviewKeywordRepository) {
        this.reviewKeywordRepository = reviewKeywordRepository;
    }

    public List<ReviewKeyword> findByCategorySeq(Integer categorySeq) {
        return reviewKeywordRepository.findByCategorySeq(categorySeq);
    }
}
