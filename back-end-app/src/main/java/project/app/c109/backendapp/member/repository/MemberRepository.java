package project.app.c109.backendapp.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.member.domain.entity.Member;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByMemberPhone(String memberPhone);
    Optional<Member> findByMemberSeq(Integer memberSeq);
    boolean existsByMemberPhone(String memberPhone);
}