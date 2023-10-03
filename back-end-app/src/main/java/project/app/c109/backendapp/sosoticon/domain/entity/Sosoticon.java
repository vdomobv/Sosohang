package project.app.c109.backendapp.sosoticon.domain.entity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.member.domain.entity.Member;

@Data
@Entity // 이 클래스는 JPA의 엔터티 클래스입니다. DB 테이블과 매핑됩니다.
@Table(name = "sosoticon") // 해당 엔터티는 "sosoticon" 테이블과 매핑됩니다.
public class Sosoticon {

    @Id // 기본 키(PK) 필드입니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID는 자동으로 증가합니다.
    @Column(name = "sosoticon_seq") // 이 필드는 "sosoticon_seq" 컬럼과 매핑됩니다.
    private Integer sosoticonSeq;

    @ManyToOne
    @JoinColumn(name = "member_seq", referencedColumnName = "member_seq")
    private Member member;


    @Column(name = "order_seq")
    private Integer orderSeq;

    @ManyToOne
    @JoinColumn(name = "store_seq", referencedColumnName = "store_seq")
    private Store store;

    @Column
    @Getter
    @Setter
    private String sosoticonGiverName;

    @Column
    @Setter
    @Getter
    private String sosoticonTakerName;

    @Column(name = "sosoticon_taker")
    private String sosoticonTaker;


    @Column(name = "sosoticon_text")
    private String sosoticonText;

    @Column(name = "sosoticon_image")
    private String sosoticonImage;

    @Column(name = "sosoticon_code")
    private String sosoticonCode;

    @Column(name = "sosoticon_url")
    private String sosoticonUrl;

    @Column(name = "sosoticon_status")
    private Integer sosoticonStatus;

    @Column(name = "sosoticon_value")
    private Integer sosoticonValue;

    @Column(name = "sosoticon_price")
    private Integer sosoticonPrice;

    @Column(name = "qr_image_url")
    private String qrImageUrl;

    @Column
    private LocalDateTime createdAt;

    // Default constructor
    public Sosoticon() {
        this.sosoticonCode = UUID.randomUUID().toString();
        System.out.println("test : Sosoticon default constructor called!");
    }

    // Getter and Setter methods

    public Integer getSosoticonSeq() {
        return sosoticonSeq;
    }

    public void setSosoticonSeq(Integer sosoticonSeq) {
        this.sosoticonSeq = sosoticonSeq;
    }


    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Integer getOrderSeq() {
        return orderSeq;
    }

    public void setOrderSeq(Integer orderSeq) {
        this.orderSeq = orderSeq;
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

    public String getSosoticonUrl() {
        return sosoticonUrl;
    }

    public void setSosoticonUrl(String sosoticonUrl) {
        this.sosoticonUrl = sosoticonUrl;
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
