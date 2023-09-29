package project.app.c109.backendapp.product.service;

import project.app.c109.backendapp.product.domain.dto.request.ProductRequestDTO;
import project.app.c109.backendapp.product.domain.dto.response.ProductResponseDTO;

import java.util.List;

// ProductService 인터페이스 선언
public interface ProductService {
    ProductResponseDTO addProduct(Integer storeSeq, ProductRequestDTO request);
    ProductResponseDTO updateProduct(Integer storeSeq, Integer productId, ProductRequestDTO request);
    void deleteProduct(Integer storeSeq, Integer productId);
    List<ProductResponseDTO> getAllProductsByStore(Integer storeSeq);
}