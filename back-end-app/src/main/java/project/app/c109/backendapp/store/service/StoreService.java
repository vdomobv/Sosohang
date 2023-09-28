package project.app.c109.backendapp.store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.category.domain.entity.Category;
import project.app.c109.backendapp.category.repository.CategoryRepository;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.keyword.repository.KeywordRepository;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.store.domain.dto.request.StoreRegisterRequest;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;
import project.app.c109.backendapp.storekeyword.domain.entity.StoreKeyword;
import project.app.c109.backendapp.storekeyword.repository.StoreKeywordRepository;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.nio.file.attribute.UserPrincipal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class StoreService {
	private final StoreRepository storeRepository;
	private final KeywordRepository keywordRepository;
	private final StoreKeywordRepository storeKeywordRepository;
	private final CategoryRepository categoryRepository;
	private final PasswordEncoder passwordEncoder;
	private StringRedisTemplate stringRedisTemplate;

	@Autowired
	public StoreService(StoreRepository storeRepository, CategoryRepository categoryRepository, KeywordRepository keywordRepository, StoreKeywordRepository storeKeywordRepository, PasswordEncoder passwordEncoder, StringRedisTemplate stringRedisTemplate) {
		this.storeRepository = storeRepository;
		this.keywordRepository = keywordRepository;
		this.storeKeywordRepository = storeKeywordRepository;
		this.categoryRepository = categoryRepository;
		this.passwordEncoder = passwordEncoder;
		this.stringRedisTemplate = stringRedisTemplate;
	}

	@Transactional
	public void registerStore(StoreRegisterRequest request) {
		// 요청에서 받아온 categorySeq로 카테고리 조회
		Category category = categoryRepository.findById(request.getCategorySeq())
				.orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + request.getCategorySeq()));

		if (storeRepository.findStoreByRegistrationNumber(request.getRegistrationNumber()) != null) {
			throw new EntityExistsException();
		}

		// Store 엔터티를 빌더 패턴을 사용하여 생성
		Store newStore = Store.builder()
				.category(category) // 카테고리를 할당
				.storePassword(passwordEncoder.encode(request.getStorePassword()))
				.storeName(request.getStoreName())
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
				.storeImage(request.getStoreImage())
				.storeLongitude(request.getStoreLongitude())
				.storeLatitude(request.getStoreLatitude())
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

		List<Keyword> keywords = storeKeywords.stream()
				.map(StoreKeyword::getKeyword)
				.collect(Collectors.toList());

		return keywords;
	}


	public Store findStoreByRegistrationNumber(String registrationNumber) {
		return storeRepository.findStoreByRegistrationNumber(registrationNumber)
				.orElseThrow(() -> new EntityNotFoundException("등록된 상점을 찾을 수 없습니다."));
	}

	public String handlePhoneVerification(String phoneNumber) {
		String authCode = String.format("%06d", (int)(Math.random() * 1000000));
		stringRedisTemplate.opsForValue().set(phoneNumber, authCode, 3, TimeUnit.MINUTES);
		return authCode;
	}

	public boolean verifyAuthCode(String ownerPhone, String inputAuthCode) {
		String storedAuthCode = stringRedisTemplate.opsForValue().get(ownerPhone);
		if(storedAuthCode == null) {
			return false;
		}
		return storedAuthCode.equals(inputAuthCode);
	}

	public void changePassword(String registartionNumber, String newPassword) {
		Store store = storeRepository.findStoreByRegistrationNumber(registartionNumber).get();
		store.setStorePassword(passwordEncoder.encode(newPassword));
		storeRepository.save(store);
	}

	public List<Store> getNearStores(Double latitude, Double longitude) {
		// 3km 반경 계산을 위한 위/경도 범위 계산
		double minLat = latitude - 0.009;
		double maxLat = latitude + 0.009;
		double minLon = longitude - 0.009;
		double maxLon = longitude + 0.009;

		return storeRepository.findByStoreLatitudeBetweenAndStoreLongitudeBetween(minLat, maxLat, minLon, maxLon);
	}
}

