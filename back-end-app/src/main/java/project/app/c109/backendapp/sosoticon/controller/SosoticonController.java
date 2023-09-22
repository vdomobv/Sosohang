package project.app.c109.backendapp.sosoticon.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;
import project.app.c109.backendapp.sosoticon.domain.dto.response.SosoticonResponseDTO;
import project.app.c109.backendapp.sosoticon.service.SosoticonService;

@RestController
@RequestMapping("/sosoticon")
public class SosoticonController {

    private final SosoticonService sosoticonService;

    public SosoticonController(SosoticonService sosoticonService) {
        this.sosoticonService = sosoticonService;
    }

    @PostMapping("/generateQR")
    public SosoticonResponseDTO generateQRCode(@RequestBody SosoticonRequestDTO request) throws Exception {
        return sosoticonService.generateQRCode(request);

    }
}