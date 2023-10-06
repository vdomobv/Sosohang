package project.app.c109.backendapp.stamp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.stamp.domain.entity.Stamp;
import project.app.c109.backendapp.store.domain.entity.Store;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StampRepository extends JpaRepository<Stamp, Integer> {

    List<Stamp> findByMember(Member member);

    List<Stamp> findByMemberAndStoreAndStampStatus(Member member, Store store, Integer stampStatus);

    List<Stamp> findByMemberAndStampStatus(Member member, Integer stampStatus);

    List<Stamp> findByStampAddedDateBetween(LocalDateTime startDate, LocalDateTime endDate);

}
