package project.app.c109.backendapp.member.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequest {

    @NotBlank
    private String memberPhone;

    @NotBlank
    private String memberPassword;
}