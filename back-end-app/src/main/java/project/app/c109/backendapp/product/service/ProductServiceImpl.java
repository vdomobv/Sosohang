package project.app.c109.backendapp.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.product.domain.dto.request.ProductRequestDTO;
import project.app.c109.backendapp.product.domain.dto.response.ProductResponseDTO;
import project.app.c109.backendapp.product.domain.entity.Product;
import project.app.c109.backendapp.store.domain.entity.Store;

import project.app.c109.backendapp.product.repository.ProductRepository;
import project.app.c109.backendapp.store.repository.StoreRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StoreRepository storeRepository; // Store와 관련된 CRUD 연산을 수행하기 위한 Repository

    @Override
    public ProductResponseDTO addProduct(Integer storeId, ProductRequestDTO request) {
        Store store = storeRepository.findById(storeId).orElseThrow(() -> new RuntimeException("Store not found"));
        Product product = mapToProduct(request);
        product.setStore(store); // Product에 Store 정보 설정
        product = productRepository.save(product);
        return mapToProductResponseDTO(product);
    }

    @Override
    public ProductResponseDTO updateProduct(Integer storeId, Integer productId, ProductRequestDTO request) {
        Store store = storeRepository.findById(storeId).orElseThrow(() -> new RuntimeException("Store not found"));
        Product product = productRepository.findByProductSeqAndStore(productId, store)
                .orElseThrow(() -> new RuntimeException("Product not found in the given store"));
        mapFromRequestToProduct(request, product);
        product = productRepository.save(product);
        return mapToProductResponseDTO(product);
    }

    @Override
    public void deleteProduct(Integer storeId, Integer productId) {
        Store store = storeRepository.findById(storeId).orElseThrow(() -> new RuntimeException("Store not found"));
        Product product = productRepository.findByProductSeqAndStore(productId, store)
                .orElseThrow(() -> new RuntimeException("Product not found in the given store"));
        productRepository.delete(product);
    }

    @Override
    public List<ProductResponseDTO> getAllProductsByStore(Integer storeSeq) {
        List<Product> products = productRepository.findByStoreStoreSeq(storeSeq);
        return products.stream().map(this::mapToProductResponseDTO).collect(Collectors.toList());
    }


    private ProductResponseDTO mapToProductResponseDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setProductSeq(product.getProductSeq());
        dto.setStoreSeq(product.getStore().getStoreSeq());
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
