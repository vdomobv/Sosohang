package project.app.c109.backendapp.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.cart.domain.dto.request.CartRequestDTO;
import project.app.c109.backendapp.cart.domain.dto.response.CartResponseDTO;
import project.app.c109.backendapp.cart.service.CartService;

import java.util.List;

@RestController  // RESTful 웹 서비스 컨트롤러 선언
@RequestMapping("/api/app/users/cart")  // 이 컨트롤러에 매핑될 기본 URL 경로
public class CartController {

    @Autowired  // CartService를 자동 주입
    private CartService cartService;

    // 카트에 상품을 추가 (POST 요청)
    @PostMapping
    public ResponseEntity<CartResponseDTO> addCart(@RequestBody CartRequestDTO request) {
        CartResponseDTO response = cartService.addCart(request);
        return ResponseEntity.ok(response);
    }

    // 회원의 모든 카트 내용을 조회 (GET 요청)
    @GetMapping
    public ResponseEntity<List<CartResponseDTO>> getAllCarts() {
        List<CartResponseDTO> cartDTOs = cartService.getAllCarts();
        return ResponseEntity.ok(cartDTOs);
    }

    // 카트에서 상품을 삭제 (DELETE 요청)
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long cartItemId) {
        cartService.deleteCart(cartItemId);
        return ResponseEntity.noContent().build();  // 204 No Content 응답
    }

    // 카트 정보를 수정 (PUT 요청)
    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartResponseDTO> updateCart(@PathVariable Long cartItemId,
                                                      @RequestBody CartRequestDTO request) {
        CartResponseDTO response = cartService.updateCart(cartItemId, request);
        return ResponseEntity.ok(response);
    }
}
