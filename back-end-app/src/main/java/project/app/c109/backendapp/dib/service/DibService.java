package project.app.c109.backendapp.dib.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.dib.domain.entity.Dib;
import project.app.c109.backendapp.dib.repository.DibRepository;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.repository.MemberRepository;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DibService {

    private final DibRepository dibRepository;
    private final MemberRepository memberRepository; // 멤버 엔터티에 접근하기 위한 레포지토리
    private final StoreRepository storeRepository; // 상점 엔터티에 접근하기 위한 레포지토리

    @Autowired
    public DibService(DibRepository dibRepository, MemberRepository memberRepository, StoreRepository storeRepository) {
        this.dibRepository = dibRepository;
        this.memberRepository = memberRepository;
        this.storeRepository = storeRepository;
    }

    public List<Dib> getDibsByMember(Integer memberSeq) {
        if (!memberRepository.existsByMemberSeq(memberSeq)) {
            throw new EntityNotFoundException();
        }
        return dibRepository.findByMemberMemberSeq(memberSeq);
    }

    public Dib addDib(Integer memberSeq, Integer storeSeq) {
        // 멤버와 상점 엔터티를 조회
        Member member = memberRepository.findById(memberSeq)
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + memberSeq));
        Store store = storeRepository.findById(storeSeq)
                .orElseThrow(() -> new EntityNotFoundException("Store not found with id: " + storeSeq));

        // 이미 찜한 상점인지 확인
        boolean alreadyDibbed = dibRepository.existsByMemberMemberSeqAndStoreStoreSeq(memberSeq, storeSeq);

        if (!alreadyDibbed) {
            // Dib 엔터티 생성
            Dib dib = Dib.builder()
                    .member(member)
                    .store(store)
                    .build();
            return dibRepository.save(dib);
        } else {
            throw new EntityExistsException("Member already dibbed this store.");
        }
    }


    @Transactional
    public void removeDib(Integer memberSeq, Integer storeSeq) {
        // 멤버와 상점 엔터티를 조회
        Member member = memberRepository.findById(memberSeq)
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + memberSeq));
        Store store = storeRepository.findById(storeSeq)
                .orElseThrow(() -> new EntityNotFoundException("Store not found with id: " + storeSeq));

        // 이미 찜한 상점인지 확인
        boolean alreadyDibbed = dibRepository.existsByMemberMemberSeqAndStoreStoreSeq(memberSeq, storeSeq);

        if (alreadyDibbed) {
            // 이미 찜한 경우에만 삭제
            dibRepository.deleteByMemberMemberSeqAndStoreStoreSeq(memberSeq, storeSeq);
        } else {
            throw new EntityNotFoundException("Member did not dib this store.");
        }
    }
}
