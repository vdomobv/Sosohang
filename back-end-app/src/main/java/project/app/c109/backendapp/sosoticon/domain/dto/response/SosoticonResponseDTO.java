package project.app.c109.backendapp.sosoticon.domain.dto.response;

public class SosoticonResponseDTO {

    private Long sosoticonSeq;
    private String sosoticonCode;
    private Integer sosoticonValue;
    private Integer sosoticonStatus;
    private String message;

    public Long getSosoticonSeq() {
        return sosoticonSeq;
    }

    public void setSosoticonSeq(Long sosoticonSeq) {
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


}

