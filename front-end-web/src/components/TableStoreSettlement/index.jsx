import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TableStoreSettlement() {
  const [settlements, setSettlements] = useState([]);
  const [settlementCount, setSettlementCount] = useState("");
  const [settlementAmount, setSettlementAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [saleData, setSaleData] = useState({});

  // useEffect(() => {
  //   // 일별 매출량 계산
  //   const dailySalesData = {};
  //   settlements.forEach((settlement) => {
  //     const date = settlement.settlementAddedDate.substr(0, 10);
  //     const amount = settlement.settlementPrice;
  //     if (dailySalesData[date]) {
  //       dailySalesData[date] += amount;
  //     } else {
  //       dailySalesData[date] = amount;
  //     }
  //   });

  //   // 차트 데이터 생성
  //   const labels = Object.keys(dailySalesData);
  //   const data = Object.values(dailySalesData);

  //   setSaleData({
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "일별매출액",
  //         data: data,
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(255, 206, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(255, 159, 64, 0.2)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  //   console.log(settlements);
  // }, [settlements]);

  const saleData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
            flex: "1",
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
      {saleData?.labels ? (
        <Doughnut
          options={{ responsive: false }}
          style={{ width: "30vw" }}
          data={saleData}
        />
      ) : (
        <></>
      )}
      {saleData?.labels ? (
        <Bar
          options={{ responsive: false }}
          style={{ width: "30vw" }}
          data={saleData}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default TableStoreSettlement;
