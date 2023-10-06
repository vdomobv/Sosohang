package project.app.c109.backendapp.config;

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
                .allowedOrigins("http://j9c109.p.ssafy.io:3000", "https:/j9c109.p.ssafy.io:3000","http://j9c109.p.ssafy.io:8081",
                        "https://j9c109.p.ssafy.io", "http://localhost:3000", "http://localhost:8081", "http://localhost:8082",
                        "https://j9c109.p.ssafy.io/api",
                        "exp://172.30.1.53:8081", "exp://172.30.1.53:8082", "exp://172.30.1.53:19000", "exp://172.30.1.53:19001",
                        "0.0.0.0:19000","0.0.0.0:19001","0.0.0.0:8081","0.0.0.0:8082", "exp://ibhvxdi.anonymous.8082.exp.direct", "exp://ibhvxdi.anonymous.8081.exp.direct")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}