package project.app.c109.backendapp.member.domain.dto.response;

import lombok.Data;
import project.app.c109.backendapp.member.domain.entity.Member;

@Data
public class LoginResponse {
    private String token;
    private Member member;

    public LoginResponse(String token, Member member) {
        this.token = token;
        this.member = member;
    }
}
