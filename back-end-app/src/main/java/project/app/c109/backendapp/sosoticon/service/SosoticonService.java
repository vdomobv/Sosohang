package project.app.c109.backendapp.sosoticon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;
import project.app.c109.backendapp.sosoticon.domain.dto.response.SosoticonResponseDTO;
import project.app.c109.backendapp.sosoticon.domain.entity.Sosoticon;
import project.app.c109.backendapp.sosoticon.repository.SosoticonRepository;
import project.app.c109.backendapp.sosoticon.util.QRCodeUtil;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

@Service
public class SosoticonService {

    @Autowired
    private SosoticonRepository sosoticonRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public Sosoticon createSosoticon(SosoticonRequestDTO requestDTO) {
        try {
            Sosoticon sosoticon = new Sosoticon();

            String uuid = QRCodeUtil.generateUUID(); // UUID 생성
            Map<String, String> qrData = new HashMap<>();
            qrData.put("uuid", uuid);
            qrData.put("taker", requestDTO.getSosoticonTaker());
            qrData.put("message", requestDTO.getSosoticonText());
            String jsonData = objectMapper.writeValueAsString(qrData);

            String generatedQRCodePath = QRCodeUtil.generateQRCode(jsonData); // QR 코드 생성
            sosoticon.setSosoticonCode(uuid); // UUID를 DB에 저장

            sosoticon.setMemberSeq(requestDTO.getMemberSeq());
            sosoticon.setCategorySeq(requestDTO.getCategorySeq());
            sosoticon.setOrderId(requestDTO.getOrderId());
            sosoticon.setSosoticonTaker(requestDTO.getSosoticonTaker());
            sosoticon.setSosoticonText(requestDTO.getSosoticonText());
            sosoticon.setSosoticonAudio(requestDTO.getSosoticonAudio());
            sosoticon.setSosoticonImage(requestDTO.getSosoticonImage());
            sosoticon.setSosoticonStatus(requestDTO.getSosoticonStatus());
            sosoticon.setSosoticonValue(requestDTO.getSosoticonValue());

            return sosoticonRepository.save(sosoticon);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while creating the Sosoticon", e);
        }
    }


    // sosoticonCode를 이용하여 Sosoticon 엔터티를 조회하는 메소드
    public Sosoticon retrieveSosoticon(String sosoticonCode) {
        return sosoticonRepository.findBySosoticonCode(sosoticonCode)
                .orElseThrow(() -> new RuntimeException("Sosoticon not found with code: " + sosoticonCode));
    }

    @Transactional // 트랜잭션 관리
    public Sosoticon updateSosoticonValue(String sosoticonCode, int newValue) {
        Sosoticon existingSosoticon = retrieveSosoticon(sosoticonCode);
        existingSosoticon.setSosoticonValue(newValue);
        return sosoticonRepository.save(existingSosoticon);
    }

    // Sosoticon 엔터티를 SosoticonResponseDTO로 변환하는 메소드
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
//        logger.info("generateQRCode method started");
        // 위의 createSosoticon 로직을 이용하여 Sosoticon 엔터티 생성
        Sosoticon sosoticon = createSosoticon(request);
//        logger.info("generateQRCode method ended");
        // Sosoticon 엔터티를 SosoticonResponseDTO로 변환
        return convertEntityToDto(sosoticon);
    }

    // QR 코드를 스캔한 데이터를 처리하는 메소드
    public void handleScannedQRCode(String scannedData) throws Exception {
        Map<String, Object> parsedData = objectMapper.readValue(scannedData, Map.class);
        String uuid = (String) parsedData.get("uuid"); // QR 코드에서 UUID 추출

        // UUID를 사용하여 DB에서 해당 소소티콘 찾기
        // sosoticonValue 조회
        Sosoticon existingSosoticon = sosoticonRepository.findBySosoticonCode(uuid)
                .orElseThrow(() -> new RuntimeException("Sosoticon not found with code: " + uuid));
        int currentBalance = existingSosoticon.getSosoticonValue(); // SosoticonValue 가져오기

        // 로깅 또는 다른 로직을 여기에 추가하기!
        System.out.println("UUID: " + uuid);
        // 현재 잔액 출력
        System.out.println("Current Balance: " + currentBalance);
    }
    public void updateSosoticonBalance(String sosoticonCode, int amountToAdd) {
        Sosoticon existingSosoticon = sosoticonRepository.findBySosoticonCode(sosoticonCode)
                .orElseThrow(() -> new RuntimeException("Sosoticon not found with code: " + sosoticonCode));

        int currentBalance = existingSosoticon.getSosoticonValue();
        existingSosoticon.setSosoticonValue(currentBalance + amountToAdd);

        sosoticonRepository.save(existingSosoticon);
    }

    // updateSosoticonBalance는 지정된 sosoticonCode에 해당하는 소소티콘의 잔액을 업데이트하며,
    // getSosoticonBalance는 해당 소소티콘의 현재 잔액을 반환
    public int getSosoticonBalance(String sosoticonCode) {
        Sosoticon existingSosoticon = sosoticonRepository.findBySosoticonCode(sosoticonCode)
                .orElseThrow(() -> new RuntimeException("Sosoticon not found with code: " + sosoticonCode));

        return existingSosoticon.getSosoticonValue();
    }
}