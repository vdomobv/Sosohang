# 기본 이미지로 OpenJDK 11을 사용
FROM openjdk:11-jre-slim
WORKDIR /app
COPY .env /app/.env

RUN apt-get update; apt-get install -y fontconfig libfreetype6
# JAR 파일을 컨테이너에 복사

COPY build/libs/back-end-app-0.0.1-SNAPSHOT.jar /app/back-end-app-0.0.1-SNAPSHOT.jar

# 외부와 통신할 포트 지정
EXPOSE 8080

# 컨테이너가 시작될 때 실행할 명령 지정
CMD ["java", "-jar", "/app/back-end-app-0.0.1-SNAPSHOT.jar"]
