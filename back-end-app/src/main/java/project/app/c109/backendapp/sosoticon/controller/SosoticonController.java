package project.app.c109.backendapp.sosoticon.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;
import project.app.c109.backendapp.sosoticon.domain.dto.response.SosoticonResponseDTO;
import project.app.c109.backendapp.sosoticon.service.SosoticonService;

@RestController
@RequestMapping("/sosoticon") // 라우팅 경로 설정
public class SosoticonController {

    private final SosoticonService sosoticonService; // 의존성 주입

    public SosoticonController(SosoticonService sosoticonService) {
        this.sosoticonService = sosoticonService;
    }

    @PostMapping("/generateQR") // POST 요청으로 QR코드 생성
    public SosoticonResponseDTO generateQRCode(@RequestBody SosoticonRequestDTO request) throws Exception {
        return sosoticonService.generateQRCode(request); // 서비스 레이어로 이동

    }
}