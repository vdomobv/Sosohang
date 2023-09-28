package project.app.c109.backendapp.stamp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.repository.MemberRepository;
import project.app.c109.backendapp.stamp.domain.entity.Stamp;
import project.app.c109.backendapp.stamp.repository.StampRepository;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StampService {

    private final MemberRepository memberRepository;
    private final StampRepository stampRepository;

    private final StoreRepository storeRepository;
    @Autowired
    public StampService(MemberRepository memberRepository, StampRepository stampRepository, StoreRepository storeRepository) {
        this.memberRepository = memberRepository;
        this.stampRepository = stampRepository;
        this.storeRepository = storeRepository;
    }

    public boolean memberExists(String memberPhone) {
        return memberRepository.existsByMemberPhone(memberPhone);
    }

    public void earnStamp(Integer storeSeq, String memberPhone, Integer stampCount) {
        Member member = memberRepository.findByMemberPhone(memberPhone)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        Store store = storeRepository.findByStoreSeq(storeSeq)
                .orElseThrow(() -> new IllegalArgumentException("Store not found"));

        for (int i = 0; i < stampCount; i++) {
            LocalDateTime now = LocalDateTime.now();
            Stamp stamp = Stamp.builder()
                    .member(member)
                    .stampStatus(0)
                    .stampAddedDate(now)
                    .store(store)
                    .build();

            stampRepository.save(stamp);
        }
    }

    public void useStamp(String memberPhone, Integer storeSeq, Integer countForUse) {
        Member member = memberRepository.findByMemberPhone(memberPhone)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        Store store = storeRepository.findByStoreSeq(storeSeq)
                .orElseThrow(() -> new IllegalArgumentException("Store not found"));

        List<Stamp> stamps = stampRepository.findByMemberAndStoreAndStampStatus(member, store, 0);

        int nowStampCount = stamps.size();

        if (nowStampCount < countForUse) {
            throw new IllegalArgumentException("Not enough stamps to use.");
        }
        // countForUse만큼 스탬프를 사용합니다.
        int count = 0;
        for (Stamp stamp : stamps) {
            if (count < countForUse) {
                // 스탬프의 상태를 1로 변경합니다.
                stamp.setStampStatus(1);
                stampRepository.save(stamp);
                count++;
            } else {
                break; // countForUse만큼 스탬프를 사용했으므로 루프를 종료합니다.
            }
        }
    }

    public List<Stamp> getStampByMember(Integer memberSeq) {
        Member member = memberRepository.findByMemberSeq(memberSeq)
                .orElseThrow(() -> new EntityNotFoundException("Member Not Found"));
        return stampRepository.findByMember(member);
    }

    public List<Stamp> getStampByMemberAndStampStatus(Integer memberSeq, Integer stampStatus) {
        Member member = memberRepository.findByMemberSeq(memberSeq)
                .orElseThrow((() -> new EntityNotFoundException()));
        return stampRepository.findByMemberAndStampStatus(member, stampStatus);
    }
    public List<Stamp> getStampByMemberAndStoreAndStampStatus(String memberPhone, Integer storeSeq, Integer stampStatus) {
        Member member = memberRepository.findByMemberPhone(memberPhone)
                .orElseThrow(() -> new EntityNotFoundException("Member Not Found"));

        Store store = storeRepository.findByStoreSeq(storeSeq)
                .orElseThrow(() -> new EntityNotFoundException("Store Not Found"));

        return stampRepository.findByMemberAndStoreAndStampStatus(member, store, stampStatus);
    }
}

