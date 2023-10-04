package project.app.c109.backendapp.sosoticon.domain.dto.request;



// 클라이언트에서 모바일 쿠폰 관련 정보를 전송할 때 사용되는 DTO

import lombok.Getter;
import lombok.Setter;

// 이 클래스는 클라이언트에서 모바일 쿠폰 관련 정보를 전송할 때 사용되는 DTO입니다.

public class SosoticonRequestDTO {

    // 보내는 사람 시퀀스
    private Integer memberSeq;
    // 주문번호(클라이언트 값 그대로 가져감)
    private Integer orderSeq;
    // 상점번호(클라이언트 값 그대로 가져감)
    private Integer storeSeq;

    @Getter
    @Setter
    // 보내는 사람 이름
    private String sosoticonGiverName;

    @Getter
    @Setter
    // 받는 사람 이름
    private String sosoticonTakerName;


    // 받는 사람 전화번호 ( 01012345678 형식임)
    private String sosoticonTaker;

    // 보내는 사람이 적는 메세지
    private String sosoticonText;

    // 각 사람이 문자로 받게 되는 url
    private String sosoticonUrl;

    // 사용자가 첨부하는 이미지
    private String sosoticonImage;

//    private String sosoticonCode;
    private Integer sosoticonStatus;
    private Integer sosoticonValue;

    public Integer getMemberSeq() {
        return memberSeq;
    }

    public void setMemberSeq(Integer memberSeq) {
        this.memberSeq = memberSeq;
    }


    public Integer getOrderSeq() {
        return orderSeq;
    }

    public void setOrderSeq(Integer orderSeq) {
        this.orderSeq = orderSeq;
    }

    public Integer getStoreSeq() { return storeSeq;}

    public void setStoreSeq(Integer storeSeq) { this.storeSeq = storeSeq;}

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

//    public String getSosoticonCode() {
//        return sosoticonCode;
//    }
//
//    public void setSosoticonCode(String sosoticonCode) {
//        this.sosoticonCode = sosoticonCode;
//    }

    public Integer getSosoticonStatus() {
        return sosoticonStatus;
    }

    public void setSosoticonStatus(Integer sosoticonStatus) {
        this.sosoticonStatus = sosoticonStatus;
    }

    public Integer getSosoticonValue() {
        return sosoticonValue;
    }

    public void setSosoticonValue(Integer sosoticonValue) {
        this.sosoticonValue = sosoticonValue;
    }

}
