package project.app.c109.backendapp.config.security;

import java.security.SecureRandom;
import java.util.Base64;

public class SecretKeyGenerator {
    public static void main(String[] args) {
        SecureRandom random = new SecureRandom();
        byte[] values = new byte[32];  // 32 bytes = 256 bits
        random.nextBytes(values);

        String secretKey = Base64.getEncoder().encodeToString(values);
        System.out.println("Secret Key: " + secretKey);
    }
}
