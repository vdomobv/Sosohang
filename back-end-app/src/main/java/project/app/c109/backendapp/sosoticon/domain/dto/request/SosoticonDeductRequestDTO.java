package project.app.c109.backendapp.sosoticon.domain.dto.request;

public class SosoticonDeductRequestDTO {
    private String sosoticonCode; // 차감하려는 소소티콘의 코드
    private int amount; // 차감하려는 금액

    // 기본 생성자, getter, setter

    public String getSosoticonCode() {
        return sosoticonCode;
    }

    public void setSosoticonCode(String sosoticonCode) {
        this.sosoticonCode = sosoticonCode;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
