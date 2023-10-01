package project.app.c109.backendapp.sosoticon.service;

import com.amazonaws.services.pinpoint.model.ChannelType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.app.c109.backendapp.member.repository.MemberRepository;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonDeductRequestDTO;

import project.app.c109.backendapp.sosoticon.domain.dto.response.SosoticonResponseDTO;
import project.app.c109.backendapp.sosoticon.domain.entity.Sosoticon;
import project.app.c109.backendapp.sosoticon.repository.SosoticonRepository;
import project.app.c109.backendapp.member.domain.entity.Member;
import project.app.c109.backendapp.member.repository.MemberRepository;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;

import project.app.c109.backendapp.sosoticon.util.QRCodeUtil;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.amazonaws.services.pinpoint.AmazonPinpoint;
import com.amazonaws.services.pinpoint.AmazonPinpointClientBuilder;
import com.amazonaws.services.pinpoint.model.*;
import com.amazonaws.AmazonServiceException;


import java.util.HashMap;
import java.util.Map;

@Service
public class SosoticonService {

    @Autowired
    private SosoticonRepository sosoticonRepository;

    @Autowired
    private MemberRepository memberRepository; // 멤버 엔터티에 접근하기 위한 레포지토리

    @Autowired
    private StoreRepository storeRepository; // 상점 엔터티에 접근하기 위한 레포지토리

    @Autowired
    private ObjectMapper objectMapper;

    // QRCodeUtil 빈 주입
    @Autowired
    private QRCodeUtil qrCodeUtil;


    @Transactional
    public Sosoticon createSosoticon(SosoticonRequestDTO requestDTO) {
        try {
            Sosoticon sosoticon = new Sosoticon();

            String uuid = qrCodeUtil.generateUUID(); // UUID 생성

            // qr이미지 주소값저장
            String qrImageUrl = "https://sosoticon.s3.ap-northeast-2.amazonaws.com/QRCode_" + uuid + ".png";
            sosoticon.setQrImageUrl(qrImageUrl);

            Map<String, String> qrData = new HashMap<>();
            qrData.put("uuid", uuid);
            qrData.put("taker", requestDTO.getSosoticonTaker());
            qrData.put("message", requestDTO.getSosoticonText());
            String jsonData = objectMapper.writeValueAsString(qrData);

            String generatedQRCodePath = qrCodeUtil.generateQRCode(jsonData, uuid); // QR 코드 생성
            sosoticon.setSosoticonCode(uuid); // UUID를 DB에 저장


            Member memberEntity = memberRepository.findById(requestDTO.getMemberSeq())
                    .orElseThrow(() -> new RuntimeException("Member not found with ID: " + requestDTO.getMemberSeq()));
            sosoticon.setMember(memberEntity);


            sosoticon.setOrderId(requestDTO.getOrderId());


            Store storeEntity = storeRepository.findById(requestDTO.getStoreSeq())
                    .orElseThrow(() -> new RuntimeException("Store not found with ID: " + requestDTO.getStoreSeq()));
            sosoticon.setStore(storeEntity);

            sosoticon.setSosoticonTaker(requestDTO.getSosoticonTaker());
            sosoticon.setSosoticonText(requestDTO.getSosoticonText());
            sosoticon.setSosoticonAudio(requestDTO.getSosoticonAudio());
            sosoticon.setSosoticonImage(requestDTO.getSosoticonImage());
            sosoticon.setSosoticonStatus(requestDTO.getSosoticonStatus());
            sosoticon.setSosoticonValue(requestDTO.getSosoticonValue());

            // MMS 보내기
            sendMMSWithImageLink(sosoticon.getSosoticonTaker(), "소중한 사람에게 소소한 행복을!, 띵동- 행복의 선물이 도착했습니다.", sosoticon.getSosoticonImage());

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
        responseDTO.setSosoticonPrice(sosoticon.getSosoticonPrice());
        responseDTO.setQrImageUrl(sosoticon.getQrImageUrl());
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

    // 사용금액을 QR 코드를 스캔해서 입력 후 POST 요청을 받으면, 해당 금액을 price에서 차감하여 value에 저장하는 로직
    public Sosoticon deductAmount(SosoticonDeductRequestDTO deductRequestDTO) {
        // UUID 혹은 코드로 Sosoticon 찾기
        Sosoticon existingSosoticon = sosoticonRepository.findBySosoticonCode(deductRequestDTO.getSosoticonCode())
                .orElseThrow(() -> new RuntimeException("Sosoticon not found with code: " + deductRequestDTO.getSosoticonCode()));

        int currentBalance = existingSosoticon.getSosoticonValue();
        int amountToDeduct = deductRequestDTO.getAmount();



        if (currentBalance < amountToDeduct) {
            throw new RuntimeException("Insufficient balance for the provided Sosoticon.");
        }

        int updatedBalance = currentBalance - amountToDeduct;
        existingSosoticon.setSosoticonValue(currentBalance - amountToDeduct); // 차감된 금액으로 업데이트
        existingSosoticon.setSosoticonPrice(existingSosoticon.getSosoticonPrice() - amountToDeduct);

        // 잔액이 0이거나 더 작으면
        if (updatedBalance <= 0) {
            existingSosoticon.setSosoticonStatus(2);  // 사용상태를 2:사용완료 로 바꾸기
        }

        return sosoticonRepository.save(existingSosoticon);
    }


    public void sendMMSWithImageLink(String phoneNumber, String message, String imageUrl) {
        try {
            AmazonPinpoint client = AmazonPinpointClientBuilder.defaultClient();

            // 주소 설정
            Map<String, AddressConfiguration> addressMap = new HashMap<>();
            addressMap.put(phoneNumber, new AddressConfiguration().withChannelType(ChannelType.SMS));

            // 메시지 설정
            SMSMessage smsMessage = new SMSMessage()
                    .withBody(message + " " + imageUrl)
                    .withMessageType(MessageType.PROMOTIONAL)
                    .withSenderId("joajoa");

            // 전송할 메시지 요청을 구성
            SendMessagesRequest request = new SendMessagesRequest()
                    .withApplicationId("6779d3d4fc6146228df515fb71a100d3")  // Pinpoint 애플리케이션 ID
                    .withMessageRequest(new MessageRequest()
                            .withAddresses(addressMap)
                            .withMessageConfiguration(new DirectMessageConfiguration().withSMSMessage(smsMessage)));

            // 메시지 전송 요청을 실행하고 응답을 받습니다.
            SendMessagesResult result = client.sendMessages(request);
            Map<String, MessageResult> resultMap = result.getMessageResponse().getResult();
            resultMap.forEach((k, v) -> System.out.println(k + ":" + v.getMessageId() + ":" + v.getStatusCode()));

        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
            throw new RuntimeException("Failed to send MMS", e);
        }
    }

}