package project.app.c109.backendapp.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.cart.domain.dto.request.CartRequestDTO;
import project.app.c109.backendapp.cart.domain.dto.response.CartResponseDTO;
import project.app.c109.backendapp.cart.domain.entity.Cart;
import project.app.c109.backendapp.cart.service.CartService;

import javax.persistence.EntityNotFoundException;
import java.util.List;




@RestController
@RequestMapping("/api/v1/cart")
public class CartController {


    private final CartService cartService;

    @Autowired
    public CartController (CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/check-cart")
    public boolean duplicatedItem(@RequestParam Integer memberSeq, @RequestParam Integer productSeq) {
        return cartService.checkDuplicatedItem(memberSeq, productSeq);
    }

    @PostMapping
    public ResponseEntity<CartResponseDTO> addCart(@RequestBody CartRequestDTO request) {
        try {
            boolean isDuplicated = cartService.checkDuplicatedItem(request.getMemberSeq(), request.getProductSeq());
            if (isDuplicated) {
                CartResponseDTO updatedResponse = cartService.updateCartItemQuantity(request);
                return ResponseEntity.ok(updatedResponse);
            } else {
                CartResponseDTO response = cartService.addCart(request);
                return ResponseEntity.ok(response);
            }
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/update")
    public ResponseEntity<CartResponseDTO> updateCart(@RequestBody CartRequestDTO request) {
        boolean isDuplicated = cartService.checkDuplicatedItem(request.getMemberSeq(), request.getProductSeq());

        if (isDuplicated) {
            CartResponseDTO updatedResponse = cartService.updateCartItemQuantity(request);
            return ResponseEntity.ok(updatedResponse);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{memberSeq}")
    public ResponseEntity<List<Cart>> getAllCartsByMemberSeq(@PathVariable Integer memberSeq) {
        List<Cart> carts = cartService.getAllCartsByMemberSeq(memberSeq);
        return ResponseEntity.ok(carts);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCartItem(@RequestParam Integer memberSeq, @RequestParam Integer productSeq) {
        cartService.deleteCartItem(memberSeq, productSeq);
        return ResponseEntity.noContent().build();
    }

}
