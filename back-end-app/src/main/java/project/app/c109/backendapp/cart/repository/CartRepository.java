package project.app.c109.backendapp.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.cart.domain.entity.Cart;

import java.util.List;
@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByMemberMemberSeq(Integer memberSeq);
    boolean existsByMemberMemberSeqAndProductProductSeq(Integer memberSeq, Integer productSeq);
    Cart findByMemberMemberSeqAndProductProductSeq(Integer memberSeq, Integer productSeq);
    void deleteByMemberMemberSeqAndProductProductSeq(Integer memberSeq, Integer productSeq);
}
