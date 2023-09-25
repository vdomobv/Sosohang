import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

function ChartStoreSales({ salesData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && salesData) {
      const ctx = chartRef.current.getContext('2d');

      // // 월별 판매 바 그래프
      // new Chart(ctx, {
      //   type: 'bar',
      //   data: {
      //     labels: salesData.months,
      //     datasets: [
      //       {
      //         label: '월별 판매 (바 그래프)',
      //         data: salesData.values,
      //         backgroundColor: 'rgba(75, 192, 192, 0.6)',
      //         borderColor: 'rgba(75, 192, 192, 1)',
      //         borderWidth: 1,
      //       },
      //     ],
      //   },
      //   options: {
      //     scales: {
      //       y: {
      //         beginAtZero: true,
      //       },
      //     },
      //   },
      // });

      // 월별 판매 원 그래프
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: salesData.months,
          datasets: [
            {
              label: '월별 판매 (원 그래프)',
              data: salesData.values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
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
