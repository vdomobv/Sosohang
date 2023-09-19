package project.app.c109.backendapp.member.domain.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Setter
@Getter
public class MemberFormDto {

    @NotBlank(message = "닉네임을 입력하세요.")
    private String memberNickname;

    @NotBlank(message = "전화번호를 입력하세요.")
    @Pattern(regexp = "\\d{10,11}", message = "올바른 전화번호 형식이 아닙니다.")
    private String memberPhone;

    @NotBlank(message = "비밀번호를 입력하세요.")
    @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다.")
    private String memberPassword;

    // 추가 필드 및 메서드를 필요에 따라 추가할 수 있습니다.
}
