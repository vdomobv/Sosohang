package project.app.c109.backendapp.config.security.jwt;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

//public class JwtAuthorizationFilter extends OncePerRequestFilter {
//    private final JwtUtils jwtUtils;

//    public JwtAuthorizationFilter(JwtUtils jwtUtils) {
//        this.jwtUtils = jwtUtils;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        try {
//            // HTTP 요청에서 JWT 토큰 추출
//            String jwtToken = jwtUtils.extractJwtTokenFromRequest(request);
//
//            // JWT 토큰 검증
//            if (jwtToken != null && jwtUtils.validateToken(jwtToken)) {
//                // JWT 토큰에서 사용자 이름과 역할 정보 추출
//                String username = jwtUtils.getMemberPhoneFromToken(jwtToken);
//
//
//                // 사용자 인증 및 권한 부여
//                List<SimpleGrantedAuthority> authorities = roles.stream()
//                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
//                        .collect(Collectors.toList());
//
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(username, null, authorities);
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        } catch (Exception e) {
//            // 예외 처리
//        }
//
//        // 다음 필터로 요청 전달
//        filterChain.doFilter(request, response);
//    }
//}
