package project.app.c109.backendapp.product.service;

import project.app.c109.backendapp.product.domain.dto.request.ProductRequestDTO;
import project.app.c109.backendapp.product.domain.dto.response.ProductResponseDTO;

import java.util.List;

// ProductService 인터페이스 선언
public interface ProductService {
    // 상품을 추가하고 결과 DTO를 반환하는 메소드
    ProductResponseDTO addProduct(ProductRequestDTO request);

    // 상품을 수정하고 결과 DTO를 반환하는 메소드
    ProductResponseDTO updateProduct(Long productId, ProductRequestDTO request);

    // 상품을 삭제하는 메소드 (반환값 없음)
    void deleteProduct(Long productId);

    // 모든 상품을 조회하고 결과 DTO 리스트를 반환하는 메소드
    List<ProductResponseDTO> getAllProducts();
}
