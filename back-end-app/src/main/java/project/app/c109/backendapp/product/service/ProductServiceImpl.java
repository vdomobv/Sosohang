package project.app.c109.backendapp.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.product.domain.dto.request.ProductRequestDTO;
import project.app.c109.backendapp.product.domain.dto.response.ProductResponseDTO;
import project.app.c109.backendapp.product.domain.entity.Product;
import project.app.c109.backendapp.product.repository.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service // 서비스로 등록
public class ProductServiceImpl implements ProductService {

    @Autowired // 의존성 주입
    private ProductRepository productRepository;

    // 상품 추가 구현
    @Override
    public ProductResponseDTO addProduct(ProductRequestDTO request) {
        // DTO를 Product 엔터티로 매핑
        Product product = mapToProduct(request);
        // DB에 상품 저장
        product = productRepository.save(product);
        // 저장된 상품을 다시 DTO로 변환하여 반환
        return mapToProductResponseDTO(product);
    }

    // 상품 수정 구현
    @Override
    public ProductResponseDTO updateProduct(Integer productId, ProductRequestDTO request) {
        // DB에서 상품을 찾아옴
        Optional<Product> optionalProduct = productRepository.findById(productId);
        // 상품이 있으면
        if (optionalProduct.isPresent()) {
            // 가져온 상품 정보
            Product product = optionalProduct.get();
            // 상품 정보 업데이트
            mapFromRequestToProduct(request, product);
            // 업데이트한 상품을 다시 저장
            product = productRepository.save(product);
            // 저장된 상품을 DTO로 변환하여 반환
            return mapToProductResponseDTO(product);
        }
        // 상품이 없으면 예외 발생
        throw new RuntimeException("Product not found");
    }

    // 상품 삭제 구현
    @Override
    public void deleteProduct(Integer productId) {
        // DB에서 해당 상품 삭제
        productRepository.deleteById(productId);
    }

    // 모든 상품 조회 구현
    @Override
    public List<ProductResponseDTO> getAllProducts() {
        // 모든 상품을 DB에서 가져옴
        List<Product> products = productRepository.findAll();
        // 가져온 상품들을 DTO로 변환
        return products.stream()
                .map(this::mapToProductResponseDTO)
                .collect(Collectors.toList());
    }

    private ProductResponseDTO mapToProductResponseDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setProductName(product.getProductName());
        dto.setProductPrice(product.getProductPrice());
        dto.setProductDcrate(product.getProductDcrate());
        dto.setProductInfo(product.getProductInfo());
        dto.setProductExp(product.getProductExp());
        dto.setProductImage(product.getProductImage());
        dto.setProductCount(product.getProductCount());
        dto.setSalesAmount(product.getSalesAmount());
        return dto;
    }

    private Product mapToProduct(ProductRequestDTO request) {
        Product product = new Product();
        product.setProductName(request.getProductName());
        product.setProductPrice(request.getProductPrice());
        product.setProductDcrate(request.getProductDcrate());
        product.setProductInfo(request.getProductInfo());
        product.setProductExp(request.getProductExp());
        product.setProductImage(request.getProductImage());
        product.setProductCount(request.getProductCount());
        product.setSalesAmount(request.getSalesAmount());
        return product;
    }

    private void mapFromRequestToProduct(ProductRequestDTO request, Product product) {
        product.setProductName(request.getProductName());
        product.setProductPrice(request.getProductPrice());
        product.setProductDcrate(request.getProductDcrate());
        product.setProductInfo(request.getProductInfo());
        product.setProductExp(request.getProductExp());
        product.setProductImage(request.getProductImage());
        product.setProductCount(request.getProductCount());
        product.setSalesAmount(request.getSalesAmount());
    }
}
