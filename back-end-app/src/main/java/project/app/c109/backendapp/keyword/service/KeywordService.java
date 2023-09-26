package project.app.c109.backendapp.keyword.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.keyword.repository.KeywordRepository;

import java.util.List;

@Service
public class KeywordService {
    private final KeywordRepository keywordRepository;

    @Autowired
    public KeywordService(KeywordRepository keywordRepository) {
        this.keywordRepository = keywordRepository;
    }

    public List<Keyword> getKeywordsByCategory(Integer categoryId) {
        // 카테고리 ID를 사용하여 해당 카테고리에 속한 키워드를 조회하는 로직을 구현
        // keywordRepository를 사용하여 데이터베이스에서 조회
        return keywordRepository.findByCategory_CategorySeq(categoryId);
    }
}
