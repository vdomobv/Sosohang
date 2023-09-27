package project.app.c109.backendapp.config.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    private final JwtConfig jwtConfig;
    private final Key key;

    @Autowired
    public JwtUtils(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
        // 안전한 512 비트 크기의 서명 키 생성
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    public String generateToken(String memberPhone) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + (long) jwtConfig.getTokenExpiration() * 1000);

        Claims claims = Jwts.claims().setSubject(memberPhone);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateStoreToken(String registrationNumber) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + (long) jwtConfig.getStoreTokenExpiration() * 1000);

        Claims claims = Jwts.claims().setSubject(registrationNumber);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        String tokenWithoutBearer = token.replace("Bearer ", ""); // "Bearer " 제거
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(tokenWithoutBearer);
            return true; // 유효한 토큰이면 true 반환
        } catch (Exception e) {
            return false; // 유효하지 않은 토큰이면 false 반환
        }
    }

    public String getMemberPhoneFromToken(String token) {
        if (validateToken(token)) {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } else {
            return null; // 유효하지 않은 토큰일 경우 null 반환 또는 예외 처리
        }
    }

    public String getRegistrationNumberFromToken(String token) {
        if (validateToken(token)) {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } else {
            return null;
        }
    }

    public String extractJwtTokenFromRequest(HttpServletRequest request) {
        String headerValue = request.getHeader("Authorization");
        if (headerValue != null && headerValue.startsWith("Bearer ")) {
            return headerValue.substring(7); // "Bearer " 제외
        }
        return null;
    }

}
