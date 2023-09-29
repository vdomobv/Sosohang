package project.app.c109.backendapp.cart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.cart.domain.dto.request.CartRequestDTO;
import project.app.c109.backendapp.cart.domain.dto.response.CartResponseDTO;
import project.app.c109.backendapp.cart.domain.entity.Cart;
import project.app.c109.backendapp.cart.repository.CartRepository;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.repository.MemberRepository;
import project.app.c109.backendapp.product.domain.entity.Product;
import project.app.c109.backendapp.product.repository.ProductRepository;

import javax.persistence.EntityNotFoundException;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    public final CartRepository cartRepository;

    public final MemberRepository memberRepository;

    public final ProductRepository productRepository;

    @Autowired
    public CartServiceImpl (CartRepository cartRepository, MemberRepository memberRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
    }

    @Override
    public CartResponseDTO addCart(CartRequestDTO request) {
        Member member = memberRepository.findByMemberSeq(request.getMemberSeq())
                .orElseThrow(() -> new EntityNotFoundException());

        Product product = productRepository.findByProductSeq(request.getProductSeq())
                .orElseThrow(() -> new EntityNotFoundException());

        Cart cart = mapToCart(member, product, request.getQuantity());
        cart = cartRepository.save(cart);
        return mapToCartResponseDTO(cart);
    }
    @Override
    @Transactional
    public CartResponseDTO updateCartItemQuantity(CartRequestDTO request) {
        Cart cart = cartRepository.findByMemberMemberSeqAndProductProductSeq(request.getMemberSeq(), request.getProductSeq());
        Integer nowQuantity = cart.getQuantity();
        Integer rlt = nowQuantity + request.getQuantity();
        if (rlt <= 0) {
            deleteCartItem(request.getMemberSeq(), request.getProductSeq());
            return null;
        } else {
            cart.setQuantity(rlt);
            cart = cartRepository.save(cart);
            return mapToCartResponseDTO(cart);
        }
    }

    @Override
    @Transactional
    public void deleteCartItem(Integer memberSeq, Integer productSeq) {
        cartRepository.deleteByMemberMemberSeqAndProductProductSeq(memberSeq, productSeq);
    }

    @Transactional
    public List<Cart> getAllCartsByMemberSeq(Integer memberSeq) {
        List<Cart> carts = cartRepository.findByMemberMemberSeq(memberSeq);
        return carts;
    }

    @Override
    public boolean checkDuplicatedItem(Integer memberSeq, Integer productSeq) {
        return cartRepository.existsByMemberMemberSeqAndProductProductSeq(memberSeq, productSeq);
    }

    private CartResponseDTO mapToCartResponseDTO(Cart cart) {
        CartResponseDTO dto = new CartResponseDTO();
        dto.setCartSeq(cart.getCartSeq());
        dto.setMemberSeq(cart.getMember().getMemberSeq());
        dto.setProductSeq(cart.getProduct().getProductSeq());
        dto.setQuantity(cart.getQuantity());
        return dto;
    }

    private Cart mapToCart(Member member, Product product, Integer quantity) {
        Cart cart = Cart.builder()
                .member(member)
                .product(product)
                .quantity(quantity)
                .build();
        return cart;
    }
}