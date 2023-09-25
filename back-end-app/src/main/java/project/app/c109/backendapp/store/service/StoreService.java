package project.app.c109.backendapp.store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.category.domain.entity.Category;
import project.app.c109.backendapp.category.repository.CategoryRepository;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.keyword.repository.KeywordRepository;
import project.app.c109.backendapp.store.domain.dto.request.StoreRegisterRequest;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;
import project.app.c109.backendapp.storekeyword.domain.entity.StoreKeyword;
import project.app.c109.backendapp.storekeyword.repository.StoreKeywordRepository;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreService {
	private final StoreRepository storeRepository;
	private final KeywordRepository keywordRepository;
	private final StoreKeywordRepository storeKeywordRepository;
	private final CategoryRepository categoryRepository;
	private final PasswordEncoder passwordEncoder;
	@Autowired
	public StoreService(StoreRepository storeRepository, CategoryRepository categoryRepository, KeywordRepository keywordRepository, StoreKeywordRepository storeKeywordRepository, PasswordEncoder passwordEncoder) {
		this.storeRepository = storeRepository;
		this.keywordRepository = keywordRepository;
		this.storeKeywordRepository = storeKeywordRepository;
		this.categoryRepository = categoryRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Transactional
	public Store registerStore(StoreRegisterRequest request) {
		// 요청에서 받아온 categorySeq로 카테고리 조회
		Category category = categoryRepository.findById(request.getCategorySeq())
				.orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + request.getCategorySeq()));

		// Store 엔터티를 빌더 패턴을 사용하여 생성
		Store newStore = Store.builder()
				.category(category) // 카테고리를 할당
				.storePassword(passwordEncoder.encode(request.getStorePassword()))
				.storeName(request.getStoreName())
				.storeId(request.getStoreId())
				.storeLocation(request.getStoreLocation())
				.storeTell(request.getStoreTell())
				.ownerTell(request.getOwnerTell())
				.storeParkinglot(request.getStoreParkinglot())
				.registrationNumber(request.getRegistrationNumber())
				.storeWorkhour(request.getStoreWorkhour())
				.storeHoliday(request.getStoreHoliday())
				.storeExtraInfo(request.getStoreExtraInfo())
				.storeUrl(request.getStoreUrl())
				.addedDate(LocalDateTime.now())
				.storeRole("STORE")
				.build();

		newStore = storeRepository.save(newStore);

		List<Integer> selectedKeywordSeqList = request.getSelectedKeywordSeqList();
		if (selectedKeywordSeqList != null && !selectedKeywordSeqList.isEmpty()) {
			List<StoreKeyword> storeKeywords = new ArrayList<>();
			for (Integer keywordSeq : selectedKeywordSeqList) {
				// 카테고리에 해당하는 키워드인지 검증
				Keyword keyword = keywordRepository.findByKeywordSeqAndCategory(keywordSeq, category)
						.orElseThrow(() -> new EntityNotFoundException("Keyword not found with id: " + keywordSeq + " for category " + category.getCategorySeq()));

				StoreKeyword storeKeyword = StoreKeyword.builder()
						.store(newStore)
						.keyword(keyword)
						.build();
				storeKeywords.add(storeKeyword);
			}
			storeKeywordRepository.saveAll(storeKeywords);
		}
		return newStore;
	}
	public List<Store> getAllStores() {
		return storeRepository.findAll();
	}

	public Store getStoreDetails(Integer storeId) {
		return storeRepository.findById(storeId).orElse(null);
	}

	public List<Store> getStoresByCategory(Integer categoryId) {
		return storeRepository.findByCategory_CategorySeq(categoryId);
	}

	public List<Store> getStoresByKeyword(Integer keywordSeq) {
		List<StoreKeyword> storeKeywords = storeKeywordRepository.findByKeyword_KeywordSeq(keywordSeq);
		List<Store> stores = storeKeywords.stream()
				.map(storeKeyword -> storeKeyword.getStore())
				.collect(Collectors.toList());
		return stores;
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

