package project.app.c109.backendapp.store.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;

@Service
public class StoreService {

	@Autowired
	private StoreRepository storeRepository;

	// 모든 상점 조회
	public List<Store> findAll() {
		return storeRepository.findAll();
	}

	// 특정 상점 ID로 조회
	public Optional<Store> findById(Integer storeId) {
		return storeRepository.findById(storeId);
	}

	// 새로운 상점 정보 저장
	public Store save(Store store) {
		return storeRepository.save(store);
	}

	// 상점 정보 수정 (이미 존재하는 경우)
	public Store update(Store store) {
		if (storeRepository.existsById(store.getStoreSeq())) {
			return storeRepository.save(store);
		} else {
			// 예외 처리 로직이 필요합니다. 여기에서는 null 반환으로 간단하게 처리합니다.
			// 실제로는 예외를 던져서 적절한 에러 응답을 컨트롤러에서 보내는 것이 좋습니다.
			return null;
		}
	}

	// 상점 정보 삭제
	public void deleteById(Integer storeId) {
		storeRepository.deleteById(storeId);
	}

	// 상점 ID로 존재 여부 확인
	public boolean existsById(Integer storeId) {
		return storeRepository.existsById(storeId);
	}
}
