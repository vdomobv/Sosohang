package project.app.c109.backendapp.member.repository;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import project.app.c109.backendapp.member.domain.entity.Member;


@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByMemberPhone(String memberPhone);
    Optional<Member> findByMemberSeq(Integer memberSeq);
    boolean existsByMemberPhone(String memberPhone);
}