package project.app.c109.backendapp.sosoticon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.sosoticon.domain.entity.Sosoticon;

import java.util.Optional;

@Repository
public interface SosoticonRepository extends JpaRepository<Sosoticon, Long> {
    // sosoticonCode로 Sosoticon 엔터티를 조회하는 메소드. 결과가 없다면 Optional.empty() 반환.
    Optional<Sosoticon> findBySosoticonCode(String sosoticonCode);
}
