package project.app.c109.backendapp.sosoticon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;
import project.app.c109.backendapp.sosoticon.domain.dto.request.SosoticonRequestDTO;

import javax.annotation.PostConstruct;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Service
public class NcpSensService {

    @Value("${ncp.sens.hostNameUrl}")
    private String HOST_NAME_URL;

    @Value("${ncp.sens.requestUrl}")
    private String REQUEST_URL;

    @Value("${ncp.sens.requestUrlType}")
    private String REQUEST_URL_TYPE;

    @Value("${ncp.sens.accessKey}")
    private String ACCESS_KEY;

    @Value("${ncp.sens.secretKey}")
    private String SECRET_KEY;

    @Value("${ncp.sens.serviceId}")
    private String SERVICE_ID;

    // 메시지 서명 생성
    private String makeSignature(String url, String timestamp, String method, String accessKey, String secretKey)
            throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException {
        String space = " ";
        String newLine = "\n";

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);
        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(rawHmac);
    }

    // SMS 보내기
    public void sendSMS(SosoticonRequestDTO requestDTO, String qrImageUrl) {
        String toPhoneNumber = requestDTO.getSosoticonTaker();
        String requestUrl = REQUEST_URL + SERVICE_ID + REQUEST_URL_TYPE;
        String apiUrl = HOST_NAME_URL + requestUrl;
        String method = "POST";
        String timestamp = Long.toString(System.currentTimeMillis());


        JSONObject bodyJson = new JSONObject();
        JSONArray toArr = new JSONArray();


        bodyJson.put("type", "MMS");
        bodyJson.put("from", "01075412881"); // 발신번호
        bodyJson.put("subject", "소소행 선물 도착!"); // MMS의 제목
        // 메시지 내용 생성
        String messageContent = requestDTO.getSosoticonGiverName()+ " 님이 " + requestDTO.getSosoticonTakerName() + " 님께 보내신 선물입니다.\n\n\n"
                + "[함께 온 마음]\n" + requestDTO.getSosoticonText() + "\n\n\n"+ "동네 상점 모바일 쿠폰 서비스 '소소행'에서 발송 되었습니다. :)"
                + "\n자세한 내용은 다음 링크에서 확인하세요 : "
                + qrImageUrl;  // 여기에 원하는 링크
        bodyJson.put("content", messageContent);

        JSONObject toJson = new JSONObject();
        toJson.put("to", toPhoneNumber);
        toArr.put(toJson);
        bodyJson.put("messages", toArr);

        // MMS에 이미지 첨부 (이 부분은 API가 지원하는지 확인필요.)
//        JSONArray files = new JSONArray();
//        files.put(fileId);
//        bodyJson.put("files", files);

        try {
            URL url = new URL(apiUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestProperty("content-type", "application/json");
            con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
            con.setRequestProperty("x-ncp-iam-access-key", ACCESS_KEY);
            con.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature(requestUrl, timestamp, method, ACCESS_KEY, SECRET_KEY));
            con.setRequestMethod(method);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(bodyJson.toString().getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 202) { // 정상 응답
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            System.out.println(response.toString());

        } catch (Exception e) {
            System.out.println(e);
        }
    }
    public void sendVerificationSMS(String recipientPhone, String authCode) {
        String requestUrl = REQUEST_URL + SERVICE_ID + REQUEST_URL_TYPE;
        String apiUrl = HOST_NAME_URL + requestUrl;
        String method = "POST";
        String timestamp = Long.toString(System.currentTimeMillis());

        JSONObject bodyJson = new JSONObject();
        JSONArray toArr = new JSONArray();

        bodyJson.put("type", "SMS");
        bodyJson.put("from", "01075412881"); // 발신번호
        String messageContent = "인증번호를 입력하세요: " + authCode;
        bodyJson.put("content", messageContent);

        JSONObject toJson = new JSONObject();
        toJson.put("to", recipientPhone);
        toArr.put(toJson);
        bodyJson.put("messages", toArr);

        try {
            URL url = new URL(apiUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestProperty("content-type", "application/json");
            con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
            con.setRequestProperty("x-ncp-iam-access-key", ACCESS_KEY);
            con.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature(requestUrl, timestamp, method, ACCESS_KEY, SECRET_KEY));
            con.setRequestMethod(method);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(bodyJson.toString().getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 202) { // 정상 응답
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            System.out.println(response.toString());

        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException("Failed to send SMS", e);
        }
    }

}