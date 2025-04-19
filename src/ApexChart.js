import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: { type: 'bar', height: 350 },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '20%', borderRadius: 5, borderRadiusApplication: 'end' },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: { categories: [] },
      yaxis: { title: { text: 'Valeurs' } },
      fill: { opacity: 1 },
      tooltip: { y: { formatter: (val) => `${val}` } }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); 
      try {
        const response = await fetch('http://localhost:8080/api/count', {  method: "GET",   headers: {
          Authorization: `Bearer ${token}`,
        
          headers: {
            "Content-Type": "application/json",
          },
         
        }});
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        
        const apiData = await response.json();

        // Extraction des années comme catégories de l'axe X
        const categories = Object.keys(apiData.Homme);

        // Transformation des données pour ApexCharts
        const series = [
          { name: 'Homme', data: Object.values(apiData.Homme) },
          { name: 'Femme', data: Object.values(apiData.Femme) }
        ];

        setChartData((prevState) => ({
          ...prevState,
          series,
          options: { ...prevState.options, xaxis: { categories } }
        }));
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} width={500} />
      </div>
    </div>
  );
};

export default ApexChart;
