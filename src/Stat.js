import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

function StatsChart() {
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: []
    },
    yaxis: {
      title: {
        text: 'Nombre de demandes'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " demandes";
        }
      }
    }
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // récupère le token JWT
        const response = await axios.get('http://localhost:8080/api/patent-stats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data.sort((a, b) => a.year - b.year);

        const categories = data.map(item => item.year);
        const admin = data.map(item => item.fromGeneralResearchAdministration);
        const structures = data.map(item => item.fromResearchStructures);
        const econ = data.map(item => item.fromEconomicInstitutions);
        const individuals = data.map(item => item.fromIndividuals);

        setOptions(prev => ({
          ...prev,
          xaxis: {
            ...prev.xaxis,
            categories: categories
          }
        }));

        setSeries([
          { name: 'Administration générale', data: admin },
          { name: 'Structures de recherche', data: structures },
          { name: 'Institutions économiques', data: econ },
          { name: 'Individus', data: individuals }
        ]);
      } catch (error) {
        console.error("Erreur lors du chargement des stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default StatsChart;
