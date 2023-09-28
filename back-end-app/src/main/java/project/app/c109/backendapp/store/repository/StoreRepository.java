package project.app.c109.backendapp.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.store.domain.entity.Store;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {
    List<Store> findByCategory_CategorySeq(Integer categoryId);
    Optional<Store> findByStoreSeq(Integer storeSeq);
    Optional<Store> findStoreByRegistrationNumber(String registrationNumber);
    boolean existsByRegistrationNumber(String registrationNumber);

    List<Store> findByStoreLatitudeBetweenAndStoreLongitudeBetween(Double minLat, Double maxLat, Double minLon, Double maxLon);

}
