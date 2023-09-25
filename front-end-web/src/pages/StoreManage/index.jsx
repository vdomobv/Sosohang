import React from 'react';
import StoreChartSales from '../../components/StoreChartAccumulate';

function  StoreManage() {
  const salesData = {
    months: ['1월', '2월', '3월', '4월', '5월', '6월'],
    values: [100, 150, 200, 120, 180, 220],
  };

  return (
    <div>
      <h1>상점관리페이지</h1>
      <StoreChartSales salesData={salesData} />
    </div>
  );
}

export default StoreManage;
