package project.web.c109.backendweb.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.web.c109.backendweb.product.domain.dto.request.ProductRequestDTO;
import project.web.c109.backendweb.product.domain.dto.response.ProductResponseDTO;
import project.web.c109.backendweb.product.domain.entity.Product;
import project.web.c109.backendweb.product.repository.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductResponseDTO addProduct(ProductRequestDTO request) {
        Product product = mapToProduct(request);
        product = productRepository.save(product);
        return mapToProductResponseDTO(product);
    }

    @Override
    public ProductResponseDTO updateProduct(Long productId, ProductRequestDTO request) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            mapFromRequestToProduct(request, product);
            product = productRepository.save(product);
            return mapToProductResponseDTO(product);
        }
        throw new RuntimeException("Product not found");
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
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
