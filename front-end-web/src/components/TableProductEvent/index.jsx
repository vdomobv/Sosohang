import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddProductModal from '../ModalProdctAdd';
// import EditProductModal from '../ModalProdctEdit';

function TableProductEvent() {
  const [data, setData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleAdd = (formData) => {
    setData([...data, formData]);
    setShowAddProductModal(false);
  };

  const handleEdit = (formData) => {
    const newData = [...data];
    newData[editIndex] = formData;
    setData(newData);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const printData = () => {
    console.log(data);
  };

  return (
    <div>
      <h1>표</h1>
      <Button onClick={() => setShowAddProductModal(true)}>데이터 추가</Button>
      <Button onClick={printData}>데이터 출력</Button>

      <AddProductModal show={showAddProductModal} onHide={() => setShowAddProductModal(false)} onClick={handleAdd} />

      {/* <EditProductModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onEdit={handleEdit}
        data={editData}
      /> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>필드 1</th>
            <th>필드 2</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.field1}</td>
              <td>{item.field2}</td>
              <td>
                <Button variant="info" onClick={() => setShowEditModal(true)}>
                  수정
                </Button>
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  삭제
                </Button>
                {setEditData(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableProductEvent;
