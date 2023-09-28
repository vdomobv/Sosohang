package project.app.c109.backendapp.sosoticon.domain.dto.response;

public class SosoticonResponseDTO {

    private Integer sosoticonSeq;
    private String sosoticonCode;
    private Integer sosoticonValue;

    private Integer sosoticonPrice;

    private Integer sosoticonStatus;
    private String message;

    private String qrImageUrl;




    public Integer getSosoticonSeq() {
        return sosoticonSeq;
    }

    public void setSosoticonSeq(Integer sosoticonSeq) {
        this.sosoticonSeq = sosoticonSeq;
    }


    public String getSosoticonCode() {
        return sosoticonCode;
    }

    public void setSosoticonCode(String sosoticonCode) {
        this.sosoticonCode = sosoticonCode;
    }

    public Integer getSosoticonValue() {
        return sosoticonValue;
    }

    public void setSosoticonValue(Integer sosoticonValue) {
        this.sosoticonValue = sosoticonValue;
    }


    public Integer getSosoticonPrice() {
        return sosoticonPrice;
    }

    public void setSosoticonPrice(Integer sosoticonPrice) {
        this.sosoticonPrice = sosoticonPrice;
    }

    public Integer getSosoticonStatus() {
        return sosoticonStatus;
    }

    public void setSosoticonStatus(Integer sosoticonStatus) {
        this.sosoticonStatus = sosoticonStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getQrImageUrl() {
        return qrImageUrl;
    }

    public void setQrImageUrl(String qrImageUrl) {
        this.qrImageUrl = qrImageUrl;
    }
}

