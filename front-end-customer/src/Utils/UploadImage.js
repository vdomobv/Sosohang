import {
  NCP_HOST_NAME_URL,
  NCP_REQUEST_URL,
  NCP_REQUEST_URL_TYPE,
  NCP_ACCESS_KEY,
  NCP_SECRET_KEY,
  NCP_SERVICE_ID,
} from "@env";
import CryptoJS from 'crypto-js';
import * as ImageManipulator from 'expo-image-manipulator';


function makeSignature(url, timestamp, method) {
  const space = " ";
  const newLine = "\n";
  const message =
    method + space + url + newLine + timestamp + newLine + NCP_ACCESS_KEY;
  const secretKey = NCP_SECRET_KEY;
  const hash = CryptoJS.HmacSHA256(message, secretKey).toString(CryptoJS.enc.Base64);
  return hash;
}

async function uploadImageToNCP(base64Image, fileName) {
  const requestUrl = NCP_REQUEST_URL + NCP_SERVICE_ID + NCP_REQUEST_URL_TYPE;
  const apiUrl = NCP_HOST_NAME_URL + requestUrl;
  const method = "POST";
  const timestamp = "" + Date.now();

  const signature = makeSignature(requestUrl, timestamp, method);
console.log("표시!!!", base64Image[0].base64);
  const bodyJson = {
    fileName: fileName,
    fileBody: base64Image[0].base64,
  };

  const headers = {
    "content-type": "application/json; charset=utf-8",
    "x-ncp-apigw-timestamp": timestamp,
    "x-ncp-iam-access-key": NCP_ACCESS_KEY,
    "x-ncp-apigw-signature-v2": signature,
  };
  console.log("Request Headers:", headers);
  console.log("Request Body:", JSON.stringify(bodyJson));

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(bodyJson),
  });

  if (!response.ok) {
    console.error('Server Response:', await response.text());  // 서버 응답 내용 로깅
    throw new Error("Failed to upload image");
  }

  const responseData = await response.json();
  return responseData.fileId;  // 이 URL을 백엔드에 전송
}


// import AWS from "aws-sdk";
// import { Buffer } from "buffer";
// import {
//     EXPO_APP_AWS_ACCESS_KEY_ID,
//     EXPO_APP_AWS_SECRET_ACCESS_KEY,
//     EXPO_APP_AWS_REGION,
//     EXPO_APP_AWS_BUCKET_NAME
// } from "@env";

// export const handleUpload = async (sosoticon) => {
//     console.log("handleUpload 함수가 호출되었습니다.");
//     AWS.config.update({
//         accessKeyId: EXPO_APP_AWS_ACCESS_KEY_ID,
//         secretAccessKey: EXPO_APP_AWS_SECRET_ACCESS_KEY,
//         region: EXPO_APP_AWS_REGION,
//     });

//     const dateNow = Date.now();

//     const s3 = new AWS.S3();
//     console.log('안녕 : ', sosoticon)
//     const params = {
//         Bucket: EXPO_APP_AWS_BUCKET_NAME,
//         Key: `${dateNow}${'test'}.jpg`, // Key를 문자열로 변환
//         Body: Buffer.from(sosoticon.sosoticonImage, "base64"),
//     };
//     console.log("S3 업로드 Params: ", params);

//     try {
//         await s3.upload(params).promise();
//         console.log('이미지 저장 완료')
//     } catch (error) {
//         console.error("Error uploading file to S3:", error);
//     }
// };
export { uploadImageToNCP };