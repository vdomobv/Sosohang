// 패키지선언
package project.app.c109.backendapp.product.controller;

// 필요한 라이브러리와 패키지 import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.product.domain.dto.request.ProductRequestDTO;
import project.app.c109.backendapp.product.domain.dto.response.ProductResponseDTO;
import project.app.c109.backendapp.product.service.ProductService;

import java.util.List;
import java.util.stream.Collectors;

// RESTful API 컨트롤러 선언
@RestController
// 이 컨트롤러가 처리할 기본 URL 경로
@RequestMapping("/api/v1/{storeId}/products")
public class ProductController {

    // ProductService를 자동 주입
    @Autowired
    private ProductService productService;


    // 상점 내 상품 추가
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(@PathVariable Integer storeId, @RequestBody ProductRequestDTO request) {
        ProductResponseDTO response = productService.addProduct(storeId, request);
        return ResponseEntity.ok(response);
    }

    // 상점 내 상품 수정
    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Integer storeId, @PathVariable Integer productId, @RequestBody ProductRequestDTO request) {
        ProductResponseDTO response = productService.updateProduct(storeId, productId, request);
        return ResponseEntity.ok(response);
    }

    // 상점 내 상품 삭제
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer storeId, @PathVariable Integer productId) {
        productService.deleteProduct(storeId, productId);
        return ResponseEntity.noContent().build();
    }

    // 상점 내 모든 상품 조회
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProductsByStore(@PathVariable Integer storeId) {
        List<ProductResponseDTO> productDTOs = productService.getAllProductsByStore(storeId);
        return ResponseEntity.ok(productDTOs);
    }
}
