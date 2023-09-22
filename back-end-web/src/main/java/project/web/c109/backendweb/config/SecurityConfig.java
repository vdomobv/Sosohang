package project.web.c109.backendweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and() // CORS 설정 활성화
            .csrf().disable() // CSRF 보호 비활성화
            .authorizeRequests(authorizeRequests ->
                authorizeRequests
                    .antMatchers("/api/v1/member/**").permitAll()
                    .antMatchers("/api-docs/**", "/swagger-ui/**", "/sosohang-app.html").permitAll()
                    .antMatchers("/api/admin/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
            )
            .formLogin(withDefaults());

        http
            .logout()
            .logoutUrl("/api/v1/member/logout") // 로그아웃 URL 설정
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID");

        // 세션을 stateless로 설정
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // JwtAuthenticationFilter를 사용자 정의 필터로 추가
        http.addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class);

        // JwtAuthorizationFilter를 사용자 정의 필터로 추가
        http.addFilterBefore(new JwtAuthorizationFilter(jwtUtils), JwtAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*"); // 모든 도메인에서 접근 허용

        // 다른 CORS 설정 (메서드, 헤더 등) 추가 가능

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}