package project.app.c109.backendapp.sosoticon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonDeductRequestDTO;
import project.app.c109.backendapp.sosoticon.domain.dto.response.SosoticonResponseDTO;
import project.app.c109.backendapp.sosoticon.domain.entity.Sosoticon;
import project.app.c109.backendapp.sosoticon.service.SosoticonService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/app/users/gift-cards") // 라우팅 경로 설정
public class SosoticonController {

    @Autowired
    private final SosoticonService sosoticonService; // 의존성 주입

    @Autowired
    public SosoticonController(SosoticonService sosoticonService) {
        this.sosoticonService = sosoticonService;
    }

    @PostMapping("/generateQR") // QR코드 생성
    public SosoticonResponseDTO generateQRCode(@RequestBody SosoticonRequestDTO request) throws Exception {
        //서비스 레이어로 이동
        return sosoticonService.generateQRCode(request);

    }

    // 소소티콘 잔액을 조회
    @GetMapping("/{sosoticonCode}/balance")
    public ResponseEntity<Integer> getSosoticonBalance(@PathVariable String sosoticonCode) {
        int balance = sosoticonService.getSosoticonBalance(sosoticonCode);
        return ResponseEntity.ok(balance);
    }


    // 잔액 업데이트
    @PutMapping("/deductAmount")
    public ResponseEntity<SosoticonResponseDTO> deductAmount(@RequestBody SosoticonDeductRequestDTO deductRequestDTO) {
        Sosoticon updatedSosoticon = sosoticonService.deductAmount(deductRequestDTO);
        SosoticonResponseDTO responseDTO = new SosoticonResponseDTO();
        responseDTO.setSosoticonSeq(updatedSosoticon.getSosoticonSeq());
        responseDTO.setSosoticonValue(updatedSosoticon.getSosoticonValue());
        responseDTO.setSosoticonPrice(updatedSosoticon.getSosoticonPrice());

        responseDTO.setSosoticonCode(updatedSosoticon.getSosoticonCode());
        responseDTO.setSosoticonStatus(updatedSosoticon.getSosoticonStatus());
        // 추가적인 필드들도 여기에 설정 가능
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/youandme")
    public List<Member> findYouAndMeList(@RequestParam Integer memberSeq) {
        List<Member> result = sosoticonService.findYouAndMeList(memberSeq);
        return result;
    }

    @GetMapping("/youandme/{mySeq}/{yourSeq}")
    public List<Sosoticon> findYouAndMeSosoticonList (@PathVariable Integer mySeq, @PathVariable Integer yourSeq) {
        List<Sosoticon> result = sosoticonService.findYouAndMeSosoticonList(mySeq, yourSeq);
        return result;
    }

    @GetMapping("/received")
    public List<Sosoticon> getReceivedList(@RequestParam Integer memberSeq) {
        List<Sosoticon> result = sosoticonService.getReceivedList(memberSeq);
        return result;
    }
}