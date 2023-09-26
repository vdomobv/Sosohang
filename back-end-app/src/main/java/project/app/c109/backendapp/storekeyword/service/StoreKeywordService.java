package project.app.c109.backendapp.storekeyword.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.storekeyword.domain.entity.StoreKeyword;
import project.app.c109.backendapp.storekeyword.repository.StoreKeywordRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreKeywordService {

    private final StoreKeywordRepository storeKeywordRepository;

    @Autowired
    public StoreKeywordService(StoreKeywordRepository storeKeywordRepository) {
        this.storeKeywordRepository = storeKeywordRepository;
    }

    public List<Keyword> getKeywordsByStoreId(Integer storeId) {
        List<StoreKeyword> storeKeywords = storeKeywordRepository.findByStoreStoreSeq(storeId);

        // StoreKeyword 엔티티에서 키워드만 추출합니다.
        List<Keyword> keywords = storeKeywords.stream()
                .map(StoreKeyword::getKeyword)
                .collect(Collectors.toList());

        return keywords;
    }
}