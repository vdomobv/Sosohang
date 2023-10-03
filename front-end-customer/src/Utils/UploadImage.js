import AWS from "aws-sdk";
import { Buffer } from "buffer";
import {
    EXPO_APP_AWS_ACCESS_KEY_ID,
    EXPO_APP_AWS_SECRET_ACCESS_KEY,
    EXPO_APP_AWS_REGION,
    EXPO_APP_AWS_BUCKET_NAME
} from "@env";

export const handleUpload = async (sosoticon) => {
    AWS.config.update({
        accessKeyId: EXPO_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: EXPO_APP_AWS_SECRET_ACCESS_KEY,
        region: EXPO_APP_AWS_REGION,
    });

    const dateNow = Date.now();

    const s3 = new AWS.S3();
    console.log('안녕 : ', sosoticon)
    const params = {
        Bucket: EXPO_APP_AWS_BUCKET_NAME,
        Key: `${dateNow}${'test'}.jpg`, // Key를 문자열로 변환
        Body: Buffer.from(sosoticon.sosoticonImage, "base64"),
    };


    try {
        await s3.upload(params).promise();
        console.log('이미지 저장 완료')
    } catch (error) {
        console.error("Error uploading file to S3:", error);
    }
}; 
