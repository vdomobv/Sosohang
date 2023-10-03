package project.app.c109.backendapp.sosoticon.domain.dto.request;



// 클라이언트에서 모바일 쿠폰 관련 정보를 전송할 때 사용되는 DTO

import lombok.Getter;
import lombok.Setter;

// 이 클래스는 클라이언트에서 모바일 쿠폰 관련 정보를 전송할 때 사용되는 DTO입니다.

public class SosoticonRequestDTO {

    private Integer memberSeq;
    private Integer orderSeq;
    private Integer storeSeq;

    @Getter
    @Setter
    private String sosoticonTakerName;

    @Getter
    @Setter
    private String sosoticonGiverName;

    private String sosoticonTaker;
    private String sosoticonText;
//    private String sosoticonAudio;
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

//    public String getSosoticonAudio() {
//        return sosoticonAudio;
//    }

//    public void setSosoticonAudio(String sosoticonAudio) {
//        this.sosoticonAudio = sosoticonAudio;
//    }

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
