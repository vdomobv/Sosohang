import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

function ChartStoreSales({ salesData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && salesData) {
      new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: salesData.months,
          datasets: [
            {
              label: '월별 판매',
              data: salesData.values,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [salesData]);

  return <canvas ref={chartRef} />;
}

export default ChartStoreSales;
