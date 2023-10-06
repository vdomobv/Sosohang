// 패키지선언
package project.app.c109.backendapp.product.controller;

// 필요한 라이브러리와 패키지 import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.product.domain.dto.request.ProductRequestDTO;
import project.app.c109.backendapp.product.domain.dto.response.ProductResponseDTO;
import project.app.c109.backendapp.product.service.ProductService;
import project.app.c109.backendapp.store.controller.StoreController;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.config.security.jwt.JwtUtils;


import javax.servlet.http.Cookie;
import java.util.List;
import java.util.stream.Collectors;

// RESTful API 컨트롤러 선언
@RestController
// 이 컨트롤러가 처리할 기본 URL 경로
@RequestMapping("/api/v1/products")
public class ProductController {
  private final JwtUtils jwtUtils;

	public ProductController(JwtUtils jwtUtils) {
			this.jwtUtils = jwtUtils;
	}

	// ProductService를 자동 주입
	@Autowired
	private ProductService productService;

	// 상점 내 상품 추가
	@PostMapping
	public ResponseEntity<ProductResponseDTO> addProduct(@CookieValue(name = "jwtToken") String cookieValue, @RequestBody ProductRequestDTO request) {
		Integer storeSeq = -1;

		if (cookieValue != null && cookieValue.startsWith("Bearer ")) {
			cookieValue = cookieValue.substring(7); // "Bearer " 부분을 제외한 토큰 추출
		}
		// JWT 토큰의 유효성 검사
		if (jwtUtils.validateToken(cookieValue)) {
			storeSeq = jwtUtils.getStoreSeqFromToken(cookieValue);

		if (storeSeq == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} 
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
			
		ProductResponseDTO response = productService.addProduct(storeSeq, request);
		return ResponseEntity.ok(response);
	}

	// 상점 내 상품 수정
	@PutMapping("/{productId}")
	public ResponseEntity<ProductResponseDTO> updateProduct(@CookieValue(name = "jwtToken") String cookieValue, @PathVariable Integer productId, @RequestBody ProductRequestDTO request) {
		Integer storeSeq = -1;

		if (cookieValue != null && cookieValue.startsWith("Bearer ")) {
			cookieValue = cookieValue.substring(7); // "Bearer " 부분을 제외한 토큰 추출
		}
		// JWT 토큰의 유효성 검사
		if (jwtUtils.validateToken(cookieValue)) {
			storeSeq = jwtUtils.getStoreSeqFromToken(cookieValue);

		if (storeSeq == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} 
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
			
		ProductResponseDTO response = productService.updateProduct(storeSeq, productId, request);
		return ResponseEntity.ok(response);
	}

	// 상점 내 상품 삭제
	@DeleteMapping("/{productId}")
	public ResponseEntity<Void> deleteProduct(@CookieValue(name = "jwtToken") String cookieValue, @PathVariable Integer productId) {
		Integer storeSeq = -1; 

		if (cookieValue != null && cookieValue.startsWith("Bearer ")) {
			cookieValue = cookieValue.substring(7); // "Bearer " 부분을 제외한 토큰 추출
		}
		// JWT 토큰의 유효성 검사
		if (jwtUtils.validateToken(cookieValue)) {
			storeSeq = jwtUtils.getStoreSeqFromToken(cookieValue);

		if (storeSeq == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} 
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
			
		productService.deleteProduct(storeSeq, productId);
		return ResponseEntity.noContent().build();
	}

	// 상점 내 모든 상품 조회
	@GetMapping
	public ResponseEntity<List<ProductResponseDTO>> getAllProductsByStoreForOwner(@CookieValue(name = "jwtToken") String cookieValue) {
		Integer storeSeq = -1;

		if (cookieValue != null && cookieValue.startsWith("Bearer ")) {
			cookieValue = cookieValue.substring(7); // "Bearer " 부분을 제외한 토큰 추출
		}
		// JWT 토큰의 유효성 검사
		if (jwtUtils.validateToken(cookieValue)) {
			storeSeq = jwtUtils.getStoreSeqFromToken(cookieValue);

		if (storeSeq == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} 
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		List<ProductResponseDTO> productDTOs = productService.getAllProductsByStore(storeSeq);
		return ResponseEntity.ok(productDTOs);
	}

	@GetMapping("/{storeId}")
	public ResponseEntity<List<ProductResponseDTO>> getAllProductsByStore(@PathVariable Integer storeId) {
		List<ProductResponseDTO> productDTOs = productService.getAllProductsByStore(storeId);

		return ResponseEntity.ok(productDTOs);
	}
}
