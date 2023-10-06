package project.app.c109.backendapp.config;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("소소행 API Document")
                .version("v0.0.1")
                .description("소소행 API 명세서입니다.");
        return new OpenAPI()
                .components(new Components())
                .info(info);
    }
}
