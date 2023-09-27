package project.app.c109.backendapp.member.domain.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class MemberLoginRequest {

    @NotBlank
    private String memberPhone;

    @NotBlank
    private String memberPassword;
}