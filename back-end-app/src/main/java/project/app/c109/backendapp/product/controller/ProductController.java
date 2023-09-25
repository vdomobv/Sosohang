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
@RequestMapping("/api/owners/products")
public class ProductController {

    // ProductService를 자동 주입
    @Autowired
    private ProductService productService;

    // 상품 추가 메소드. POST 요청을 처리
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(@RequestBody ProductRequestDTO request) {
        // 서비스 레이어의 addProduct 메소드 호출 후 결과를 response에 저장
        ProductResponseDTO response = productService.addProduct(request);
        // 결과를 HTTP 200 OK 상태와 함께 반환
        return ResponseEntity.ok(response);
    }

    // 상품 수정 메소드. PUT 요청을 처리
    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long productId,
                                                            @RequestBody ProductRequestDTO request) {
        // 서비스 레이어의 updateProduct 메소드 호출 후 결과를 response에 저장
        ProductResponseDTO response = productService.updateProduct(productId, request);
        // 결과를 HTTP 200 OK 상태와 함께 반환
        return ResponseEntity.ok(response);
    }

    // 상품 삭제 메소드. DELETE 요청을 처리
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        // 서비스 레이어의 deleteProduct 메소드 호출
        productService.deleteProduct(productId);
        // HTTP 204 No Content 상태로 응답 (삭제 성공)
        return ResponseEntity.noContent().build();
    }

    // 모든 상품 조회 메소드. GET 요청을 처리
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        // 서비스 레이어의 getAllProducts 메소드 호출 후 결과를 productDTOs에 저장
        List<ProductResponseDTO> productDTOs = productService.getAllProducts();
        // 결과를 HTTP 200 OK 상태와 함께 반환
        return ResponseEntity.ok(productDTOs);
    }
}
