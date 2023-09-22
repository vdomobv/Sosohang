package project.app.c109.backendapp.config.security.jwt;
// 로그인 시 토큰
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // HTTP 요청에서 JWT 토큰 추출
            String jwtToken = jwtUtils.extractJwtTokenFromRequest(request);

            // JWT 토큰 검증
            if (jwtToken != null && jwtUtils.validateToken(jwtToken)) {
                // 검증이 성공하면 사용자 인증 처리
                String username = jwtUtils.getMemberPhoneFromToken(jwtToken);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, null);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // 예외 처리
        }

        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }
}

