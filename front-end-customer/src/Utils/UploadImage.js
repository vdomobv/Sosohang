import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import {
    EXPO_APP_AWS_ACCESS_KEY_ID,
    EXPO_APP_AWS_SECRET_ACCESS_KEY,
    EXPO_APP_AWS_REGION,
    EXPO_APP_AWS_BUCKET_NAME
} from "@env";
import { RNS3 } from 'react-native-aws3';


export async function uploadImageToS3(uri, fileName) {
  const file = {
    uri,
    name: fileName,
    type: "image/jpeg"
  };

  const options = {
    keyPrefix: "uploads/",
    bucket: EXPO_APP_AWS_BUCKET_NAME,
    region: EXPO_APP_AWS_REGION,
    accessKey: EXPO_APP_AWS_ACCESS_KEY_ID,
    secretKey: EXPO_APP_AWS_SECRET_ACCESS_KEY,
    successActionStatus: 201
  };

  try {
    const response = await RNS3.put(file, options);
    console.log('Uploaded image URL:', response.body.postResponse.location);
    return response.body.postResponse.location; // 업로드된 이미지의 URL을 반환
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}



// import CryptoJS from 'crypto-js';
// import * as ImageManipulator from 'expo-image-manipulator';

// async function uploadImageToNCP(base64Image, fileName) {
//   // NCP Object Storage와 호환성을 위한 endpoint 설정
//   const s3 = new AWS.S3({
//       endpoint: NCP_HOST_NAME_URL, // NCP Object Storage endpoint
//       region: 'kr-standard', // NCP Object Storage region
//       credentials: {
//           accessKeyId: NCP_ACCESS_KEY,
//           secretAccessKey: NCP_SECRET_KEY
//       }
//   });

//   const params = {
//       Bucket: NCP_BUCKET_NAME, // Set your bucket name here
//       Key: fileName,
//       Body: new Buffer(base64Image, 'base64'),
//       ContentType: 'image/jpeg',
//       ACL: 'public-read'  // optional
//   };

//   try {
//       const { Location } = await s3.upload(params).promise();
//       console.log('Uploaded image URL:', Location);
//       return Location;  // 업로드된 이미지의 URL을 반환
//   } catch (error) {
//       console.error('Error uploading image:', error);
//       throw error;
//   }
// }

// export { uploadImageToNCP };

// function makeSignature(url, timestamp, method) {
//   const space = " ";
//   const newLine = "\n";
//   const message =
//     method + space + url + newLine + timestamp + newLine + NCP_ACCESS_KEY;
//   const secretKey = NCP_SECRET_KEY;
//   const hash = CryptoJS.HmacSHA256(message, secretKey).toString(CryptoJS.enc.Base64);
//   return hash;
// }

// async function uploadImageToNCP(base64Image, fileName) {
//   const requestUrl = NCP_REQUEST_URL + NCP_SERVICE_ID + NCP_REQUEST_URL_TYPE;
//   const apiUrl = NCP_HOST_NAME_URL + requestUrl;
//   const method = "POST";
//   const timestamp = "" + Date.now();

//   const signature = makeSignature(requestUrl, timestamp, method);
// console.log("표시!!!", base64Image[0].base64);
//   const bodyJson = {
//     fileName: fileName,
//     fileBody: base64Image[0].base64,
//   };

//   const headers = {
//     "content-type": "application/json; charset=utf-8",
//     "x-ncp-apigw-timestamp": timestamp,
//     "x-ncp-iam-access-key": NCP_ACCESS_KEY,
//     "x-ncp-apigw-signature-v2": signature,
//   };
//   console.log("Request Headers:", headers);
//   console.log("Request Body:", JSON.stringify(bodyJson));

//   const response = await fetch(apiUrl, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify(bodyJson),
//   });

//   if (!response.ok) {
//     console.error('Server Response:', await response.text());  // 서버 응답 내용 로깅
//     throw new Error("Failed to upload image");
//   }

//   const responseData = await response.json();
//   return responseData.fileId;  // 이 URL을 백엔드에 전송
// }


// // import AWS from "aws-sdk";
// // import { Buffer } from "buffer";
// // import {
// //     EXPO_APP_AWS_ACCESS_KEY_ID,
// //     EXPO_APP_AWS_SECRET_ACCESS_KEY,
// //     EXPO_APP_AWS_REGION,
// //     EXPO_APP_AWS_BUCKET_NAME
// // } from "@env";

// // export const handleUpload = async (sosoticon) => {
// //     console.log("handleUpload 함수가 호출되었습니다.");
// //     AWS.config.update({
// //         accessKeyId: EXPO_APP_AWS_ACCESS_KEY_ID,
// //         secretAccessKey: EXPO_APP_AWS_SECRET_ACCESS_KEY,
// //         region: EXPO_APP_AWS_REGION,
// //     });

// //     const dateNow = Date.now();

// //     const s3 = new AWS.S3();
// //     console.log('안녕 : ', sosoticon)
// //     const params = {
// //         Bucket: EXPO_APP_AWS_BUCKET_NAME,
// //         Key: `${dateNow}${'test'}.jpg`, // Key를 문자열로 변환
// //         Body: Buffer.from(sosoticon.sosoticonImage, "base64"),
// //     };
// //     console.log("S3 업로드 Params: ", params);

// //     try {
// //         await s3.upload(params).promise();
// //         console.log('이미지 저장 완료')
// //     } catch (error) {
// //         console.error("Error uploading file to S3:", error);
// //     }
// // };
// export { uploadImageToNCP };