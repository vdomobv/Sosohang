package project.app.c109.backendapp.product.domain.dto.response;

public class ProductResponseDTO {

    private Integer id;
    private String productName;
    private Integer productPrice;
    private Integer productDcrate;
    private String productInfo;
    private String productExp;
    private String productImage;
    private Integer productCount;
    private Integer salesAmount;

    // Getter와 Setter 메서드들...

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Integer productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getProductDcrate() {
        return productDcrate;
    }

    public void setProductDcrate(Integer productDcrate) {
        this.productDcrate = productDcrate;
    }

    public String getProductInfo() {
        return productInfo;
    }

    public void setProductInfo(String productInfo) {
        this.productInfo = productInfo;
    }

    public String getProductExp() {
        return productExp;
    }

    public void setProductExp(String productExp) {
        this.productExp = productExp;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public Integer getProductCount() {
        return productCount;
    }

    public void setProductCount(Integer productCount) {
        this.productCount = productCount;
    }

    public Integer getSalesAmount() {
        return salesAmount;
    }

    public void setSalesAmount(Integer salesAmount) {
        this.salesAmount = salesAmount;
    }
}
