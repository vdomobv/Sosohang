package project.app.c109.backendapp.product.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.product.domain.entity.Product;
import project.app.c109.backendapp.store.domain.entity.Store;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByStoreStoreSeq(Integer storeSeq);
    Optional<Product> findByProductSeq(Integer productSeq);
    Optional<Product> findByProductSeqAndStore(Integer productSeq, Store store);
}
// JPA (Java Persistence API)를 사용하여 작성된 인터페이스
// 별도의 메소드 구현이 없는 이유 :  Spring Data JPA가 제공하는 JpaRepository 인터페이스를 확장(extend)하고 있음
// 기본 CRUD 연산을 위한 메소드들(save, findById, findAll, deleteById 등)이 이미 구현되어 있어,
//ProductRepository 인터페이스는 이 기본 메소드들을 상속받아, 별도의 구현 없이도 사용할 수 있습니다.