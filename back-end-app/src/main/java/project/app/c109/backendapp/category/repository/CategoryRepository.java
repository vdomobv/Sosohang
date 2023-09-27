package project.app.c109.backendapp.category.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.app.c109.backendapp.category.domain.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}