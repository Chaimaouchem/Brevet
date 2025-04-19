import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Stats = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: { type: 'pie', width: 380 },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { width: 100 },
          legend: { position: 'bottom' }
        }
      }]
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); 
      try {
        const response = await fetch('http://localhost:8080/api/countByGenderAndYear', {   method: "GET", headers: {
          Authorization: `Bearer ${token}`,
         
          headers: {
            "Content-Type": "application/json",
          },
         
        }});
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        
        const apiData = await response.json();

        // Calcul du total pour chaque genre
        const totalHommes = Object.values(apiData.Homme).reduce((acc, val) => acc + val, 0);
        const totalFemmes = Object.values(apiData.Femme).reduce((acc, val) => acc + val, 0);

        setChartData((prevState) => ({
          ...prevState,
          series: [totalHommes, totalFemmes], // Valeurs des hommes et femmes
          options: { ...prevState.options, labels: ['Homme', 'Femme'] }
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
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
      </div>
    </div>
  );
};

export default Stats;
