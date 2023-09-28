package project.app.c109.backendapp.storekeyword.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.storekeyword.domain.entity.StoreKeyword;

import java.util.List;

public interface StoreKeywordRepository extends JpaRepository<StoreKeyword, Integer> {
    List<StoreKeyword> findByKeyword_KeywordSeq(Integer keywordSeq);
    List<StoreKeyword> findByStoreStoreSeq(Integer storeSeq);
    void deleteByStore_StoreSeq(Integer storeSeq);
}