package project.app.c109.backendapp.member.domain.dto.response;

import project.app.c109.backendapp.member.domain.entity.Member;

public class LoginResponse {
    private String token;
    private Member member;

    public LoginResponse(String token, Member member) {
        this.token = token;
        this.member = member;
    }

//     게터와 세터
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
