package project.web.c109.backendweb.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.web.c109.backendweb.store.domain.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Integer> {
	// JpaRepository에는 기본 CRUD 메소드가 포함되어 있습니다.
	// 여기에 필요한 추가 쿼리 메소드를 작성할 수 있습니다.
}
