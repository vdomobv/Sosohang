package project.web.c109.backendweb.config;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

    /**
     * CORS 정책 허용 URL, METHOD
     * @param corsRegistry
     */
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedOrigins("http://j9c109.p.ssafy.io:3000", "https://j9c109.p.ssafy.io:3000",
                        "https://j9c109.p.ssafy.io", "http://localhost:3000")
                .allowedMethods((ALLOWED_METHOD_NAMES.split(",")));
    }
}