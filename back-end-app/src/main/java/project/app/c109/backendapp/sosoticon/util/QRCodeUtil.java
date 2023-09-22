package project.app.c109.backendapp.sosoticon.util;

import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.qrcode.QRCodeWriter;

import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.UUID;

public class QRCodeUtil {


    public static String generateQRCode(String content) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 200, 200);

            String username = System.getProperty("wisdomx2"); // Windows에서 사용자 이름 가져오기(임시로 경로를 바탕화면으로 하였음)
            Path path = FileSystems.getDefault().getPath("C:\\Users\\" + username + "\\Desktop\\QRCode.png");
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);

            return "QRCode.png";
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate QR code", e);
        }
    }

    public static String generateUUID() {
        return UUID.randomUUID().toString();
    }
}
