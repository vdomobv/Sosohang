package project.app.c109.backendapp.member.domain.dto.request;



import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class MemberRegisterRequest {

    @NotBlank
    private String memberNickname;

    @NotBlank
    @Pattern(regexp = "^010[0-9]\\d{7}$", message = "올바른 전화번호 형식이 아닙니다.")
    private String memberPhone;

    @NotBlank
    @Pattern(regexp = "^(?=.*?[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{6,15}$", message = "올바른 비밀번호 형식이 아닙니다.")
    private String memberPassword;
}
