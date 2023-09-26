package project.app.c109.backendapp.cart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.cart.domain.dto.request.CartRequestDTO;
import project.app.c109.backendapp.cart.domain.dto.response.CartResponseDTO;
import project.app.c109.backendapp.cart.domain.entity.Cart;
import project.app.c109.backendapp.cart.repository.CartRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service  // Spring의 Service 어노테이션
public class CartServiceImpl implements CartService {

    @Autowired  // CartRepository를 자동 주입
    private CartRepository cartRepository;

    // 새로운 카트를 추가하는 메서드
    @Override
    public CartResponseDTO addCart(CartRequestDTO request) {
        Cart cart = mapToCart(request);  // DTO를 엔터티로 매핑
        cart = cartRepository.save(cart);  // 카트를 저장
        return mapToCartResponseDTO(cart);  // 엔터티를 다시 DTO로 매핑하고 반환
    }

    // 카트를 수정하는 메서드
    @Override
    public CartResponseDTO updateCart(Long cartId, CartRequestDTO request) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            cart.setQuantity(request.getQuantity());  // 수량만 업데이트
            cart = cartRepository.save(cart);  // 업데이트된 카트 저장
            return mapToCartResponseDTO(cart);  // 엔터티를 다시 DTO로 매핑하고 반환
        }
        throw new RuntimeException("Cart not found");
    }


    // 카트를 삭제하는 메서드
    @Override
    public void deleteCart(Long cartId) {
        cartRepository.deleteById(cartId);  // 카트 삭제
    }

    // 모든 카트를 가져오는 메서드
    @Override
    public List<CartResponseDTO> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();  // 모든 카트 찾기
        return carts.stream()
                .map(this::mapToCartResponseDTO)  // 각 엔터티를 DTO로 매핑
                .collect(Collectors.toList());
    }

    // Cart 엔터티를 CartResponseDTO로 매핑하는 유틸리티
    private CartResponseDTO mapToCartResponseDTO(Cart cart) {
        CartResponseDTO dto = new CartResponseDTO();
        dto.setCartSeq(cart.getCartSeq());
        dto.setMemberSeq(cart.getMemberSeq());
        dto.setProductSeq(cart.getProductSeq());
        dto.setStoreSeq(cart.getStoreSeq());
        dto.setQuantity(cart.getQuantity());
        return dto;
    }

    // CartRequestDTO를 Cart 엔터티로 매핑하는 유틸리티
    private Cart mapToCart(CartRequestDTO request) {
        Cart cart = new Cart();
        cart.setMemberSeq(request.getMemberSeq());
        cart.setProductSeq(request.getProductSeq());
        cart.setStoreSeq(request.getStoreSeq());
        cart.setQuantity(request.getQuantity());
        return cart;
    }
}