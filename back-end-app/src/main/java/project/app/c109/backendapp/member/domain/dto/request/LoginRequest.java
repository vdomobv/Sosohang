package project.app.c109.backendapp.member.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequest {
    @Schema(description = "memberPhone", example = "01012341234")
    @NotBlank
    private String memberPhone;

    @Schema(description = "memberPassword", example = "stringst")
    @NotBlank
    private String memberPassword;
}