# 기본 이미지로 OpenJDK 11을 사용
FROM node:16
WORKDIR /app
COPY package.json .
# JAR 파일을 컨테이너에 복사

RUN npm install

COPY . .

CMD [ "react-scripts", "start" ]
