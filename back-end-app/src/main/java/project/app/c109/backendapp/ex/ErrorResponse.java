package project.app.c109.backendapp.ex;

import lombok.Data;

@Data
public class ErrorResponse {
    private Integer status;
    private String message;

    public ErrorResponse(Integer status, String message) {
        this.status = status;
        this.message = message;
    }
}
