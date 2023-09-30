import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import axios from "axios";

function TableStoreSettlement() {
  const [settlements, setSettlements] = useState([]);

  useEffect(() => {
    axios
      .get("api/v1/settlement/store")
      // .get("http://localhost:8081/api/v1/settlement/store")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Form.Group>
        <Form.Control type="date"/>
        <Form.Control type="date"/>
      </Form.Group>
      <Button>제품 추가</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>사용일</th>
            <th>사용금액</th>
          </tr>
        </thead>
        <tbody>
          {settlements.map((settlement, index) => (
            <tr key={index}>
              <td>{settlement.settlementAddedDate}</td>
              <td>{settlement.settlementPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
  );
}

export default TableStoreSettlement;
