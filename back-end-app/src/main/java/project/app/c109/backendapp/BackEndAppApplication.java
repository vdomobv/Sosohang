package project.app.c109.backendapp;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackEndAppApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load(); // 환경 변수 로드

		// 환경 변수들을 시스템 속성으로 설정
		System.setProperty("aws.accessKeyId", dotenv.get("aws.accessKeyId"));
		System.setProperty("aws.secretKey", dotenv.get("aws.secretKey"));
		System.setProperty("aws.region", dotenv.get("aws.region"));
		System.setProperty("BUCKET_NAME", dotenv.get("BUCKET_NAME"));

		SpringApplication.run(BackEndAppApplication.class, args);
	}

}
