package project.app.c109.backendapp.sosoticon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;
import project.app.c109.backendapp.sosoticon.domain.dto.response.SosoticonResponseDTO;
import project.app.c109.backendapp.sosoticon.service.SosoticonService;

@RestController
@RequestMapping("/api/app/users/gift-cards") // 라우팅 경로 설정
public class SosoticonController {


    private final SosoticonService sosoticonService; // 의존성 주입

    @Autowired
    public SosoticonController(SosoticonService sosoticonService) {
        this.sosoticonService = sosoticonService;
    }

    @PostMapping("/generateQR") // POST 요청으로 QR코드 생성
    public SosoticonResponseDTO generateQRCode(@RequestBody SosoticonRequestDTO request) throws Exception {
        //서비스 레이어로 이동
        return sosoticonService.generateQRCode(request);

    }
}