package project.app.c109.backendapp.sosoticon.domain.entity;

import javax.persistence.*;
import java.util.UUID;

@Entity // 이 클래스는 JPA의 엔터티 클래스입니다. DB 테이블과 매핑됩니다.
@Table(name = "sosoticon") // 해당 엔터티는 "sosoticon" 테이블과 매핑됩니다.
public class Sosoticon {

    @Id // 기본 키(PK) 필드입니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID는 자동으로 증가합니다.
    @Column(name = "sosoticon_seq") // 이 필드는 "sosoticon_seq" 컬럼과 매핑됩니다.
    private Long sosoticonSeq;

    @Column(name = "member_seq") // 이 필드는 "member_seq" 컬럼과 매핑됩니다.
    private Long memberSeq;

    @Column(name = "category_seq") // 이 필드는 "category_seq" 컬럼과 매핑됩니다.
    private Long categorySeq;

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "store_seq", nullable = false)
    private Long storeSeq;

    @Column(name = "sosoticon_taker")
    private String sosoticonTaker;

    @Column(name = "sosoticon_text")
    private String sosoticonText;

    @Column(name = "sosoticon_audio")
    private String sosoticonAudio;

    @Column(name = "sosoticon_image")
    private String sosoticonImage;

    @Column(name = "sosoticon_code")
    private String sosoticonCode;

    @Column(name = "sosoticon_status")
    private Integer sosoticonStatus;

    @Column(name = "sosoticon_value")
    private Integer sosoticonValue;

    @Column(name = "sosoticon_price")
    private Integer sosoticonPrice;

    @Column(name = "qr_image_url")
    private String qrImageUrl;

    // Default constructor
    public Sosoticon() {
        this.sosoticonCode = UUID.randomUUID().toString();
        System.out.println("test : Sosoticon default constructor called!");
    }

    // Getter and Setter methods

    public Long getSosoticonSeq() {
        return sosoticonSeq;
    }

    public void setSosoticonSeq(Long sosoticonSeq) {
        this.sosoticonSeq = sosoticonSeq;
    }

    public Long getMemberSeq() {
        return memberSeq;
    }

    public void setMemberSeq(Long memberSeq) {
        this.memberSeq = memberSeq;
    }

    public Long getCategorySeq() {
        return categorySeq;
    }

    public void setCategorySeq(Long categorySeq) {
        this.categorySeq = categorySeq;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getStoreSeq() {
        return storeSeq;
    }

    public void setStoreSeq(Long storeSeq) {
        this.storeSeq = storeSeq;
    }


    public String getSosoticonTaker() {
        return sosoticonTaker;
    }

    public void setSosoticonTaker(String sosoticonTaker) {
        this.sosoticonTaker = sosoticonTaker;
    }

    public String getSosoticonText() {
        return sosoticonText;
    }

    public void setSosoticonText(String sosoticonText) {
        this.sosoticonText = sosoticonText;
    }

    public String getSosoticonAudio() {
        return sosoticonAudio;
    }

    public void setSosoticonAudio(String sosoticonAudio) {
        this.sosoticonAudio = sosoticonAudio;
    }

    public String getSosoticonImage() {
        return sosoticonImage;
    }

    public void setSosoticonImage(String sosoticonImage) {
        this.sosoticonImage = sosoticonImage;
    }

    public String getSosoticonCode() {
        return sosoticonCode;
    }

    public void setSosoticonCode(String sosoticonCode) {
        this.sosoticonCode = sosoticonCode;
    }

    public Integer getSosoticonStatus() {
        return sosoticonStatus;
    }

    public void setSosoticonStatus(Integer sosoticonStatus) {
        this.sosoticonStatus = sosoticonStatus;
    }

    public Integer getSosoticonValue() {
        return sosoticonValue;
    }


    public Integer getSosoticonPrice() {
        return sosoticonPrice;
    }

    // sosoticonValue를 처음 설정할 때 그 값을 sosoticonPrice에도 저장
    public void setSosoticonValue(Integer sosoticonValue) {
        if(this.sosoticonPrice == null) { // 초기값이 아직 설정되지 않았다면
            this.sosoticonPrice = sosoticonValue; // 초기값을 설정
        }
        this.sosoticonValue = sosoticonValue;
    }

    public void setSosoticonPrice(Integer sosoticonPrice) {
        this.sosoticonPrice = sosoticonPrice;
    }

    public String getQrImageUrl() {
        return qrImageUrl;
    }

    public void setQrImageUrl(String qrImageUrl) {
        this.qrImageUrl = qrImageUrl;
    }
}
