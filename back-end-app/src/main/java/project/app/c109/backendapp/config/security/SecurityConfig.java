package project.app.c109.backendapp.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import project.app.c109.backendapp.config.security.jwt.JwtAuthenticationFilter;

import project.app.c109.backendapp.config.security.jwt.JwtUtils;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtUtils jwtUtils;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable(); // CSRF 보호 비활성화

        http
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .antMatchers("/api/**", "/api-docs/**", "/swagger-ui/**", "/sosohang-app.html").permitAll()
                                .antMatchers("/api/admin/**").hasRole("ADMIN")
//                                .antMatchers("/api/v1/member/test").authenticated() // 토큰이 있는 사용자만 접근 가능한 엔드포인트
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


        return http.build();
    }
}
