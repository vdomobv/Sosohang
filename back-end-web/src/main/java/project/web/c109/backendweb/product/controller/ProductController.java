package project.web.c109.backendweb.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.web.c109.backendweb.product.domain.dto.request.ProductRequestDTO;
import project.web.c109.backendweb.product.domain.dto.response.ProductResponseDTO;
import project.web.c109.backendweb.product.service.ProductService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/owners/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // 상품 추가
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(@RequestBody ProductRequestDTO request) {
        ProductResponseDTO response = productService.addProduct(request);
        return ResponseEntity.ok(response);
    }

    // 상품 수정
    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long productId,
                                                            @RequestBody ProductRequestDTO request) {
        ProductResponseDTO response = productService.updateProduct(productId, request);
        return ResponseEntity.ok(response);
    }

    // 상품 삭제
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    // 모든 상품 조회 (예시 추가)
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> productDTOs = productService.getAllProducts();
        return ResponseEntity.ok(productDTOs);
    }
}
