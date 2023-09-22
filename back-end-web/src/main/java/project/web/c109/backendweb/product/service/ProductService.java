package project.web.c109.backendweb.product.service;

import project.web.c109.backendweb.product.domain.dto.request.ProductRequestDTO;
import project.web.c109.backendweb.product.domain.dto.response.ProductResponseDTO;

import java.util.List;

public interface ProductService {
    ProductResponseDTO addProduct(ProductRequestDTO request);
    ProductResponseDTO updateProduct(Long productId, ProductRequestDTO request);
    void deleteProduct(Long productId);
    List<ProductResponseDTO> getAllProducts();
}
