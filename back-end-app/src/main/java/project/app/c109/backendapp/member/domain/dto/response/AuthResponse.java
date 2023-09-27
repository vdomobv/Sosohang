package project.app.c109.backendapp.member.domain.dto.response;

import lombok.Data;

@Data
public class AuthResponse {
    private String status;
    private String message;

    public AuthResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
