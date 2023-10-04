import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AWS from "aws-sdk";

function FileUpload({ onChange }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const dateNow = Date.now();

    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: dateNow + file.name,
      Body: file,
    };

    try {
      await s3.upload(params).promise();
      onChange(
        `https://sosoticon.s3.ap-northeast-2.amazonaws.com/${params.Key}`
      );
    } catch (error) {
      console.error("Error uploading file to S3:", error);
    }
  };

  return (
    <div>
      <Form.Label>이미지</Form.Label>
      <div>
        <input type="file" onChange={handleFileChange} />
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleUpload();
          }}>
          이미지 업로드
        </Button>
      </div>
    </div>
  );
}

export default FileUpload;
