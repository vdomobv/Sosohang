package project.app.c109.backendapp.sosoticon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.sosoticon.domain.entity.Sosoticon;

import java.util.Optional;

@Repository
public interface SosoticonRepository extends JpaRepository<Sosoticon, Long> {
    Optional<Sosoticon> findBySosoticonCode(String sosoticonCode);
}
