import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const StatUniversity = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [{ data: [] }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
       },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true, columnWidth: '20%',borderRadiusApplication: 'end'
        },
      },
      
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/countByUniversity', {   method: "GET",  headers: {
          Authorization: `Bearer ${token}`,
        
          headers: {
            "Content-Type": "application/json",
          },
         
        }});
        const data = await response.json();
        const categories = Object.keys(data);
        const values = Object.values(data);
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [{ data: values }],
          options: {
            ...prevOptions.options,
            xaxis: { categories: categories },
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white shadow-xl rounded-2xl">
       <div id="chart">
        <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="bar" height={320} width={500} />
      </div>
    </div>
  );
};

export default StatUniversity;
