package project.app.c109.backendapp.product.domain.dto.request;

public class ProductRequestDTO {

    private Integer storeSeq;       // store의 ID를 저장하는 필드

    private String productName;
    private Integer productPrice;
    private Integer productDcrate;
    private String productInfo;
    private String productExp;
    private String productImage;
    private Integer productCount;
    private Integer salesAmount;

    // 기본 생성자, getter, setter, etc...
    public Integer getStoreSeq() {
        return storeSeq;
    }

    public void setStoreSeq(Integer storeSeq) {
        this.storeSeq = storeSeq;
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
