import React, { useState } from "react";
import { Table, Button, Form, ToggleButton } from "react-bootstrap";

function ItemTable() {
  const [data, setData] = useState([]);
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const addData = () => {
    setData([
      ...data,
      {
        productName: "",
        productPrice: "",
        productDcrate: "",
        productInfo: "",
        productExp: "90일",
        productImage: "",
        productCount: "",
        salesAmount: "",
      },
    ]);

    if (!selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(data.length + 1).keys()]);
    }
  };

  const editData = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const deleteData = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const toggleItemSelection = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const deleteSelectedItems = () => {
    const newData = data.filter((_, index) => !selectedItems.includes(index));
    setData(newData);
    setSelectedItems([]);
  };

  const toggleAllItems = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(data.length).keys()]);
    }
    setSelectAll(!selectAll);
  };

  const printData = () => {
    console.log(data);
  };

  return (
    <div>
      <h1>표</h1>
      <Button onClick={printData}>데이터 출력</Button>
      <Table striped bordered hover style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th>
              <ToggleButton
                id="all-toggle-check"
                variant="outline-primary"
                type="checkbox"
                onChange={toggleAllItems}
                checked={selectAll}
              />
            </th>
            <th>상품명</th>
            <th>정상가</th>
            <th>할인율</th>
            <th>상품설명</th>
            <th>사용기간</th>
            <th>상품사진</th>
            <th>수량</th>
            <th>판매개수</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <ToggleButton
                  id={`${index}-toggle-check`}
                  variant="outline-primary"
                  type="checkbox"
                  onChange={() => toggleItemSelection(index)}
                  checked={selectedItems.includes(index)}
                />
              </td>
              <td
                onClick={() => setEditableRowIndex(index)}
                onBlur={(e) => {
                  setEditableRowIndex(null);
                  editData(index, "productName", e.currentTarget.innerText);
                }}
                contentEditable={editableRowIndex === index}
                suppressContentEditableWarning={true}
              >
                {item.productName}
              </td>
              <td
                onClick={() => setEditableRowIndex(index)}
                onBlur={(e) => {
                  setEditableRowIndex(null);
                  editData(index, "productPrice", e.currentTarget.innerText);
                }}
                contentEditable={editableRowIndex === index}
                suppressContentEditableWarning={true}
              >
                {item.productPrice}
              </td>
              <td
                onClick={() => setEditableRowIndex(index)}
                onBlur={(e) => {
                  setEditableRowIndex(null);
                  editData(index, "productDcrate", e.currentTarget.innerText);
                }}
                contentEditable={editableRowIndex === index}
                suppressContentEditableWarning={true}
              >
                {item.productDcrate}
              </td>
              <td
                onClick={() => setEditableRowIndex(index)}
                onBlur={(e) => {
                  setEditableRowIndex(null);
                  editData(index, "productInfo", e.currentTarget.innerText);
                }}
                contentEditable={editableRowIndex === index}
                suppressContentEditableWarning={true}
              >
                {item.productInfo}
              </td>
              <td>
                <Form.Select
                  onChange={(e) => {
                    setEditableRowIndex(null);
                    editData(index, "productExp", e.target.value);
                  }}
                  value={item.productExp}
                >
                  <option value="30일">30일</option>
                  <option value="60일">60일</option>
                  <option value="90일">90일</option>
                </Form.Select>
              </td>
              <td
                onClick={() => setEditableRowIndex(index)}
                onBlur={(e) => {
                  setEditableRowIndex(null);
                  editData(index, "productImage", e.currentTarget.innerText);
                }}
                contentEditable={editableRowIndex === index}
                suppressContentEditableWarning={true}
              >
                {item.productImage}
              </td>
              <td
                onClick={() => setEditableRowIndex(index)}
                onBlur={(e) => {
                  setEditableRowIndex(null);
                  editData(index, "productCount", e.currentTarget.innerText);
                }}
                contentEditable={editableRowIndex === index}
                suppressContentEditableWarning={true}
              >
                {item.productCount}
              </td>
              <td
                onClick={() => setEditableRowIndex(index)}
                onBlur={(e) => {
                  setEditableRowIndex(null);
                  editData(index, "salesAmount", e.currentTarget.innerText);
                }}
                contentEditable={false}
                suppressContentEditableWarning={true}
              >
                {item.salesAmount}
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteData(index)}>
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={addData}>데이터 추가</Button>
      <Button onClick={deleteSelectedItems}>선택된 항목 삭제</Button>
    </div>
  );
}

export default ItemTable;
