package project.app.c109.backendapp.sosoticon.util;

import org.springframework.beans.factory.annotation.Value;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;
import project.app.c109.backendapp.sosoticon.service.S3UploadService;
import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.UUID;
import java.io.ByteArrayInputStream;
import java.util.Base64;

@Component
public class QRCodeUtil_Image {

    @Autowired
    private S3UploadService s3UploadService;

    @Value("${ncp.sens.accessKey}")
    private String ACCESS_KEY;
    public BufferedImage getImageFromNCP(String fileId) {
        String endpoint = "https://sosoticon.kr-standard.storage.ncloud.com";  // NCP Object Storage의 엔드포인트 URL
        try {
            URL url = new URL(endpoint + "/" + fileId);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("x-ncp-apigw-timestamp", String.valueOf(System.currentTimeMillis()));
            connection.setRequestProperty("x-ncp-iam-access-key", ACCESS_KEY);
            // 추가적인 헤더 및 인증 정보 설정이 필요할 수 있습니다.
            BufferedImage image = ImageIO.read(connection.getInputStream());
            return image;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private BufferedImage overlayQRCodeOnTemplate(BufferedImage qrCode, SosoticonRequestDTO requestDTO) throws Exception {
        // 템플릿 이미지를 리소스에서 읽어옴
        BufferedImage templateImage = ImageIO.read(getClass().getResourceAsStream("/static/images/sosoticon_template.png"));

        Graphics2D graphics = templateImage.createGraphics();
        graphics.setColor(Color.BLACK);
        graphics.setFont(new Font("맑은 고딕", Font.BOLD, 15));

        // 받는사람의 이름 그리기
//        graphics.drawString(requestDTO.getSosoticonTakerName() + " 님에게 도착한 선물", 50, 50);

        int desiredWidth = 270;  // 원하는 너비
        int desiredHeight = 150;  // 원하는 높이

        // 사용자 첨부 이미지 (이미지 URL 또는 경로에서 이미지를 읽어와야 함)
        // BufferedImage attachedImage = getImageFromNCP(requestDTO.getSosoticonImage());


        // 사용자 첨부 이미지 (이미지 URL 또는 경로에서 이미지를 읽어와야 함)
         BufferedImage attachedImage = ImageIO.read(new URL(requestDTO.getSosoticonImage()));

        // Tnx 이미지 합성하기
//        BufferedImage attachedImage = ImageIO.read(getClass().getResourceAsStream("/static/images/thx.png"));

        graphics.drawImage(attachedImage, 25, 40, desiredWidth, desiredHeight, null); // 예시 위치 및 크기

        // 메세지 그리기
        graphics.drawString(requestDTO.getSosoticonText(), 85, 270);


        // 보내는 사람 이름
//        graphics.drawString(requestDTO.getSosoticonGiverName() + " 님이 보내셨습니다.", 185, 185);

        int qrCodeX = (templateImage.getWidth() - qrCode.getWidth()) / 2;  // 중앙에 위치하도록 조정
        int qrCodeY = (templateImage.getHeight() - qrCode.getHeight()) / 2 + 180;
        graphics.drawImage(qrCode, qrCodeX, qrCodeY, null);
        graphics.dispose();


        return templateImage;
    }

//    public String generateQRCode(String data, String uuid, SosoticonRequestDTO requestDTO) throws Exception {
//        try {
//            QRCodeWriter qrCodeWriter = new QRCodeWriter();
//            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 200, 200);
//            BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
//
//            // 합쳐진 이미지 생성
//            BufferedImage combinedImage = overlayQRCodeOnTemplate(qrImage, requestDTO);
//
//            String fileName = "QRCode_" + uuid + ".png";  // 이미 받은 UUID 사용
//            String userHome = System.getProperty("user.home");
//            Path path = FileSystems.getDefault().getPath(userHome + "\\Desktop\\" + fileName);
//
//            // 합쳐진 이미지를 파일로 저장
//            ImageIO.write(combinedImage, "PNG", path.toFile());
//
//            // S3 업로드 로직
//            String fileUrl = s3UploadService.uploadImageToS3(fileName, path);
//
//            return fileUrl;
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to generate QR code", e);
//        }
//    }
public String generateQRCode(String data, String uuid, SosoticonRequestDTO requestDTO) throws Exception {
    try {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 200, 200);
        BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        // 합쳐진 이미지 생성
        BufferedImage combinedImage = overlayQRCodeOnTemplate(qrImage, requestDTO);

        // BufferedImage를 Base64로 인코딩
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(combinedImage, "PNG", baos);
        byte[] imageInByte = baos.toByteArray();
        baos.close();

        // 파일 이름
        String fileName = "QRCode_" + uuid + ".png";  // 이미 받은 UUID 사용

        // S3 업로드 로직 - 바이트 배열을 사용해서 업로드
        String fileUrl = s3UploadService.uploadImageToS3(fileName, imageInByte);  // s3UploadService를 수정해야할 수도 있습니다.

        return fileUrl;
    } catch (Exception e) {
        throw new RuntimeException("Failed to generate QR code", e);
    }
}

    public String generateUUID() {
        return UUID.randomUUID().toString();
    }
}
