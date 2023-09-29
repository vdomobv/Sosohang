package project.app.c109.backendapp.cart.service;


import project.app.c109.backendapp.cart.domain.dto.request.CartRequestDTO;
import project.app.c109.backendapp.cart.domain.dto.response.CartResponseDTO;
import project.app.c109.backendapp.cart.domain.entity.Cart;

import java.util.List;


public interface CartService {
    CartResponseDTO addCart(CartRequestDTO request);

    CartResponseDTO updateCartItemQuantity(CartRequestDTO request);

    void deleteCartItem(Integer memberSeq, Integer productSeq);

    List<Cart> getAllCartsByMemberSeq(Integer memberSeq);

    boolean checkDuplicatedItem(Integer memberSeq, Integer productSeq);
}
