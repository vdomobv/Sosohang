package project.app.c109.backendapp.stamp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.repository.MemberRepository;
import project.app.c109.backendapp.stamp.domain.entity.Stamp;
import project.app.c109.backendapp.stamp.repository.StampRepository;

import java.time.LocalDateTime;

@Service
public class StampService {

    private final MemberRepository memberRepository;
    private final StampRepository stampRepository;

    @Autowired
    public StampService(MemberRepository memberRepository, StampRepository stampRepository) {
        this.memberRepository = memberRepository;
        this.stampRepository = stampRepository;
    }

    public boolean memberExists(String memberPhone) {
        return memberRepository.existsByMemberPhone(memberPhone);
    }

    public void earnStamp(Integer storeSeq, String memberPhone) {
        Member member = memberRepository.findByMemberPhone(memberPhone)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        // storeSeq를 받아서 스탬프 엔터티 생성
        LocalDateTime now = LocalDateTime.now();
        Stamp stamp = Stamp.builder()
                .member(member)
                .stampStatus(0)
                .stampAddedDate(now)
                .storeSeq(storeSeq) // storeSeq 설정
                .build();

        stampRepository.save(stamp);
    }

    public void useStamp(Integer stampSeq) {
        Stamp stamp = stampRepository.findById(stampSeq)
                .orElseThrow(() -> new IllegalArgumentException("Stamp not found"));

        LocalDateTime now = LocalDateTime.now();
        stamp.setStampStatus(1);
        stamp.setStampUsedDate(now);
        stampRepository.save(stamp);
    }
}

