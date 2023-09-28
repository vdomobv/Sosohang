package project.app.c109.backendapp.dib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.dib.domain.entity.Dib;

import java.util.List;
import java.util.Optional;

@Repository
public interface DibRepository extends JpaRepository<Dib, Integer> {
    List<Dib> findByMemberMemberSeq(Integer memberSeq);

    List<Dib> findByMemberMemberSeqAndStoreStoreSeq(Integer memberSeq, Integer storeSeq);

    void deleteByMemberMemberSeqAndStoreStoreSeq(Integer memberSeq, Integer storeSeq);
    boolean existsByMemberMemberSeqAndStoreStoreSeq(Integer memberSeq, Integer storeSeq);
}