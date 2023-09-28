package project.app.c109.backendapp.product.service;

import project.app.c109.backendapp.product.domain.dto.request.ProductRequestDTO;
import project.app.c109.backendapp.product.domain.dto.response.ProductResponseDTO;

import java.util.List;

// ProductService 인터페이스 선언
public interface ProductService {
    ProductResponseDTO addProduct(Integer storeId, ProductRequestDTO request);
    ProductResponseDTO updateProduct(Integer storeId, Integer productId, ProductRequestDTO request);
    void deleteProduct(Integer storeId, Integer productId);
    List<ProductResponseDTO> getAllProductsByStore(Integer storeId);
}