package project.app.c109.backendapp.config.security.jwt;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Data
public class JwtConfig {

    private String secretKey;
    private int tokenExpiration;
    private int storeTokenExpiration;
}
