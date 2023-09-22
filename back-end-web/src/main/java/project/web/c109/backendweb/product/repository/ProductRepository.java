package project.web.c109.backendweb.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.web.c109.backendweb.product.domain.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
