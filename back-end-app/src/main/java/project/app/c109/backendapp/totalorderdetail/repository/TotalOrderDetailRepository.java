package project.app.c109.backendapp.totalorderdetail.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.totalorderdetail.domain.entity.TotalOrderDetail;

import java.util.List;
import java.util.Optional;

@Repository
public interface TotalOrderDetailRepository extends JpaRepository<TotalOrderDetail, Integer> {

    List<TotalOrderDetail> findByMemberSeqOrderByTotalOrderSeqDesc(Integer memberSeq);
    List<TotalOrderDetail> findTotalOrderDetailsByTotalOrderSeqAndStoreSeq(Integer totalOrderSeq, Integer storeSeq);


}
