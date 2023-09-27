package project.app.c109.backendapp.product.domain.entity;

import javax.persistence.*;

// JPA Entity 선언
@Entity
// 데이터베이스에서의 테이블 이름
@Table(name = "product")
public class Product {

    // Primary Key 선언
    @Id
    // Primary Key 생성 전략 (여기서는 auto-increment)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 데이터베이스에서의 컬럼 이름
    @Column(name = "product_seq")
    private Integer id;

    // 상품명, null을 허용하지 않고 길이는 최대 50
    @Column(name = "product_name", nullable = false, length = 50)
    private String productName;

    // 정상가, null을 허용하지 않음
    @Column(name = "product_price", nullable = false)
    private Integer productPrice;

    // 할인율
    @Column(name = "product_dcrate")
    private Integer productDcrate;

    // 상품설명, null을 허용하지 않고 길이는 최대 2000
    @Column(name = "product_info", nullable = false, length = 2000)
    private String productInfo;

    // 사용기간, null을 허용하지 않고 길이는 최대 500 (50에서 늘렸음)
    @Column(name = "product_exp", nullable = false, length = 500)
    private String productExp;

    // 상품 이미지 URL, null을 허용하지 않고 길이는 최대 2000
    @Column(name = "product_image", nullable = false, length = 2000)
    private String productImage;

    // 수량
    @Column(name = "product_count")
    private Integer productCount;

    // 판매개수
    @Column(name = "sales_amount")
    private Integer salesAmount;

    // 기본 생성자, getter, setter, etc...
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
