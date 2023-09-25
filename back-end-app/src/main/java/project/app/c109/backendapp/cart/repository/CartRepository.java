package project.app.c109.backendapp.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.app.c109.backendapp.cart.domain.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    // Custom query methods, if needed
}
