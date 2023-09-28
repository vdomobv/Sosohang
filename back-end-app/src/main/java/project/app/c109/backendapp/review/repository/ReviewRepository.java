package project.app.c109.backendapp.review.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import project.app.c109.backendapp.review.domain.entity.Review;

import java.util.List;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    public List<Review> findByStoreSeq(Integer storeSeq);
}