import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AWS from "aws-sdk";
import styles from "./styles";

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
      <input type="file" onChange={handleFileChange}
      style={{ marginLeft: '20px' }}
      />
      <Button
        style={{ backgroundColor: "#46C27D", borderColor: '#46C27D' }}
        onClick={(e) => {
          e.preventDefault();
          handleUpload();
        }}>
        업로드
      </Button>
    </div>
  );
}

export default FileUpload;
