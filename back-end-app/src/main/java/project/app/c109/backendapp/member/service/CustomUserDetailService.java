package project.app.c109.backendapp.member.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.repository.MemberRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;

    public CustomUserDetailService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String memberPhone) throws UsernameNotFoundException {
        // memberPhone을 사용하여 사용자를 조회하고 해당 사용자 정보를 반환합니다.
        // 사용자를 찾지 못한 경우 UsernameNotFoundException을 던집니다.

        Member member = memberRepository.findByMemberPhone(memberPhone)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 사용자 정보로 UserDetails 객체를 생성하여 반환합니다.
        return User.builder()
                .username(member.getMemberPhone())
                .password(member.getMemberPassword())
                .authorities("ROLE_USER")
                .build();
    }
}
