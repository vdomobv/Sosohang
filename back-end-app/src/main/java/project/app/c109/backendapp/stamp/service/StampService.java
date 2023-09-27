package project.app.c109.backendapp.stamp.service;

import org.springframework.beans.factory.annotation.Autowired;
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
    public void useStamp(Integer stampSeq) {
        Stamp stamp = stampRepository.findById(stampSeq)
                .orElseThrow(() -> new IllegalArgumentException("Stamp not found"));

        LocalDateTime now = LocalDateTime.now();
        stamp.setStampStatus(1);
        stamp.setStampUsedDate(now);
        stampRepository.save(stamp);
    }

    public List<Stamp> getStampByMember(Integer memberId) {
        Member member = memberRepository.findByMemberSeq(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Invalid credentials."));

        return stampRepository.findByMember(member);
    }
}

