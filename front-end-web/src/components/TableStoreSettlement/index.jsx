import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import axios from "axios";

function TableStoreSettlement() {
  const [settlements, setSettlements] = useState([]);
  const [settlementCount, setSettlementCount] = useState("");
  const [settlementAmount, setSettlementAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    axios
      .get("api/v1/settlement/store")
      .then((res) => {
        setSettlements(res.data.settlements);
        setSettlementCount(res.data.settlementCount);
        setSettlementAmount(
          res.data.totalSettlementPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSettlements = () => {
    if (startDate === "" || endDate === "") {
      alert("날자를 올바르게 입력하세요");
    } else {
      axios
        .get("api/v1/settlement/store/date", {
          params: {
            startDate: startDate + "T00:00:00",
            endDate: endDate + "T23:59:59",
          },
        })
        .then((res) => {
          setSettlements(res.data.settlements);
          setSettlementCount(res.data.settlementCount);
          setSettlementAmount(
            res.data.totalSettlementPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1>상점관리페이지</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Form.Group>
          <Form.Control
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleSettlements}>조회하기</Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flex: "1"
          }}>
          <Form.Label>판매건수: {settlementCount}</Form.Label>
          <Form.Label>판매금액: {settlementAmount}</Form.Label>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>사용일</th>
            <th>사용시각</th>
            <th>사용금액</th>
          </tr>
        </thead>
        <tbody>
          {settlements.map((settlement, index) => (
            <tr key={index}>
              <td>{settlement.settlementAddedDate.substr(0, 10)}</td>
              <td>{settlement.settlementAddedDate.substr(11, 8)}</td>
              <td>{`${settlement.settlementPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableStoreSettlement;
