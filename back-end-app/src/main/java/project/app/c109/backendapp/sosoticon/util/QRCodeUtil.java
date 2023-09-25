package project.app.c109.backendapp.sosoticon.util;

import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.UUID;

public class QRCodeUtil {

    public static String generateQRCode(String data) throws Exception {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 200, 200);

            String uuid = generateUUID();  // UUID 생성
            String fileName = "QRCode_" + uuid + ".png";  // 고유한 파일명 생성

            String userHome = System.getProperty("user.home");  // 사용자 홈 디렉터리 가져오기
            Path path = FileSystems.getDefault().getPath(userHome + "\\Desktop\\" + fileName);  // 고유한 파일명 사용
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

            return fileName;  // 고유한 파일명 반환
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate QR code", e);
        }
    }

    public static String generateUUID() {
        return UUID.randomUUID().toString();
    }
}
