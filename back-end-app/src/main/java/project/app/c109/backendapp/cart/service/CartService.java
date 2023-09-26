package project.app.c109.backendapp.cart.service;

import project.app.c109.backendapp.cart.domain.dto.request.CartRequestDTO;
import project.app.c109.backendapp.cart.domain.dto.response.CartResponseDTO;

import java.util.List;

public interface CartService {
    CartResponseDTO addCart(CartRequestDTO request);
    CartResponseDTO updateCart(Long cartId, CartRequestDTO request);
    void deleteCart(Long cartId);
    List<CartResponseDTO> getAllCarts();
    // 기타 필요한 메서드를 추가하세요.
}
