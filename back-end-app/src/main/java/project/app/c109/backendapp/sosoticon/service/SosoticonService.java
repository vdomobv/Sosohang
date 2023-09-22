package project.app.c109.backendapp.sosoticon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;
import project.app.c109.backendapp.sosoticon.domain.dto.response.SosoticonResponseDTO;
import project.app.c109.backendapp.sosoticon.domain.entity.Sosoticon;
import project.app.c109.backendapp.sosoticon.repository.SosoticonRepository;
import project.app.c109.backendapp.sosoticon.util.QRCodeUtil;


@Service
public class SosoticonService {

    @Autowired
    private SosoticonRepository sosoticonRepository;

    @Transactional
    public Sosoticon createSosoticon(SosoticonRequestDTO requestDTO) {
        Sosoticon sosoticon = new Sosoticon();

        sosoticon.setMemberSeq(requestDTO.getMemberSeq());
        sosoticon.setCategorySeq(requestDTO.getCategorySeq());
        sosoticon.setOrderId(requestDTO.getOrderId());
        sosoticon.setSosoticonTaker(requestDTO.getSosoticonTaker());
        sosoticon.setSosoticonText(requestDTO.getSosoticonText());
        sosoticon.setSosoticonAudio(requestDTO.getSosoticonAudio());
        sosoticon.setSosoticonImage(requestDTO.getSosoticonImage());

        String generatedUUID = QRCodeUtil.generateUUID();  // Util 클래스에서 UUID 생성
        String generatedQRCode = QRCodeUtil.generateQRCode(generatedUUID);  // Util 클래스에서 QR 코드 생성
        sosoticon.setSosoticonCode(generatedQRCode);

        sosoticon.setSosoticonStatus(requestDTO.getSosoticonStatus());
        sosoticon.setSosoticonValue(requestDTO.getSosoticonValue());

        return sosoticonRepository.save(sosoticon);
    }


    public Sosoticon retrieveSosoticon(String sosoticonCode) {
        return sosoticonRepository.findBySosoticonCode(sosoticonCode)
                .orElseThrow(() -> new RuntimeException("Sosoticon not found with code: " + sosoticonCode));
    }

    @Transactional
    public Sosoticon updateSosoticonValue(String sosoticonCode, int newValue) {
        Sosoticon existingSosoticon = retrieveSosoticon(sosoticonCode);
        existingSosoticon.setSosoticonValue(newValue);
        return sosoticonRepository.save(existingSosoticon);
    }
    private SosoticonResponseDTO convertEntityToDto(Sosoticon sosoticon) {
        SosoticonResponseDTO responseDTO = new SosoticonResponseDTO();
        responseDTO.setSosoticonSeq(sosoticon.getSosoticonSeq());
        responseDTO.setSosoticonCode(sosoticon.getSosoticonCode());
        responseDTO.setSosoticonStatus(sosoticon.getSosoticonStatus());
        responseDTO.setSosoticonValue(sosoticon.getSosoticonValue());
        responseDTO.setMessage("QR Code generated successfully");
        return responseDTO;
    }

    @Transactional
    public SosoticonResponseDTO generateQRCode(SosoticonRequestDTO request) {
        // 위의 createSosoticon 로직을 이용하여 Sosoticon 엔터티 생성
        Sosoticon sosoticon = createSosoticon(request);

        // Sosoticon 엔터티를 SosoticonResponseDTO로 변환
        return convertEntityToDto(sosoticon);
    }


}
