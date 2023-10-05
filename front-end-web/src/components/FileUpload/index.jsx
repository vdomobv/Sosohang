import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AWS from "aws-sdk";
import styles from "./styles";

function FileUpload({ onChange }) {
  const [file, setFile] = useState(null);

  const [fileName, setFileName] = useState("파일 선택"); // 선택된 파일의 이름을 상태로 관리

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // 선택된 파일을 변수에 할당
    // console.log(selectedFile); // 여기에서 선택된 파일 로그 출력
    setFile(selectedFile);
    setFileName(selectedFile.name); // 추가: 선택된 파일의 이름 상태 업데이트
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
      // console.error("Error uploading file to S3:", error);
    }
  };

  return (
    <div>
      <Form.Label>이미지</Form.Label>
      <div className="filebox">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          onChange={handleFileChange}
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            border: "0",
          }}
        />
        <label
          className="custom-file-label"
          htmlFor="customFile"
          style={{
            display: "inline-block",
            padding: ".5em .75em",
            color: "#999",
            fontSize: "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
            backgroundColor: "#fdfdfd",
            cursor: "pointer",
            border: "1px solid #ebebeb",
            borderBottomColor: "#e2e2e2",
            borderRadius: ".25em",
          }}
        >
          {fileName}
        </label>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleUpload();
          }}
          variant="light"
          style={{ marginLeft: 10 }}
        >
          이미지 업로드
        </Button>
      </div>
      {/* <input type="file" onChange={handleFileChange}
      style={{ marginLeft: '20px' }}
      />
      <Button
        style={{ backgroundColor: "#46C27D", borderColor: '#46C27D' }}
        onClick={(e) => {
          e.preventDefault();
          handleUpload();
        }}>
        업로드
      </Button> */}
    </div>
  );
}

export default FileUpload;
