package project.app.c109.backendapp.store.domain.dto.request;

import lombok.Getter;

import javax.validation.constraints.Pattern;

@Getter
public class StoreLoginRequest {

    @Pattern(regexp = "\\d{10}$")
    private String registrationNumber;
    private String storePassword;
}
