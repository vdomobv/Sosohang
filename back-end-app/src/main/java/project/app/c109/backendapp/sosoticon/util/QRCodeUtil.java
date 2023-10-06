package project.app.c109.backendapp.sosoticon.util;

import project.app.c109.backendapp.sosoticon.service.S3UploadService;
import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.UUID;

@Component
public class QRCodeUtil {

    @Autowired
    private S3UploadService s3UploadService;

//    public String generateQRCode(String data, String uuid) throws Exception { // UUID 파라미터 추가
//        try {
//            QRCodeWriter qrCodeWriter = new QRCodeWriter();
//            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 200, 200);
//
//            String fileName = "QRCode_" + uuid + ".png";  // 이미 받은 UUID 사용
//            String userHome = System.getProperty("user.home");
//            Path path = FileSystems.getDefault().getPath(userHome + "\\Desktop\\" + fileName);
//
//            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
//
//            // S3 업로드 로직
//            String fileUrl = s3UploadService.uploadImageToS3(fileName, path);
//
//            return fileUrl;
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to generate QR code", e);
//        }
//    }

    public String generateUUID() {
        return UUID.randomUUID().toString();
    }
}
