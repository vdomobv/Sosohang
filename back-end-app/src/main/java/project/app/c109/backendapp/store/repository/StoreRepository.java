package project.app.c109.backendapp.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.c109.backendapp.store.domain.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Integer> {
	// JpaRepository에는 기본 CRUD 메소드가 포함되어 있습니다.
	// 여기에 필요한 추가 쿼리 메소드를 작성할 수 있습니다.
}
