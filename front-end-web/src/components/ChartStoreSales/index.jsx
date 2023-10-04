import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartStoreSales(props) {
  const {salesData} = props
  const [data, setData] = useState({})

  console.log(salesData)

  return <div><h1>{salesData}</h1></div>
  // useEffect(()=> {
  //   // setData({
      

  //   // })


  // }, [salesData])

  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // }

  // useEffect(() => {
  //   if (chartRef.current && salesData) {
  //     new Chart(chartRef.current, {
  //       type: "line",
  //       data: {
  //         labels: salesData.months,
  //         datasets: [
  //           {
  //             label: "월별 판매",
  //             data: salesData.values,
  //             backgroundColor: "rgba(75, 192, 192, 0.6)",
  //             borderColor: "rgba(75, 192, 192, 1)",
  //             borderWidth: 1,
  //           },
  //         ],
  //       },
  //     });
  //   }
  // }, [salesData]);


  // return <Doughnut  data={data} />;
  
}

export default ChartStoreSales;
