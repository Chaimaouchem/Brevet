import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const StatUnivYears = () => {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.5,
          
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Innovations by University and Year', 
        
        align: 'left',
        offsetY: -6,
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Year',
        },
      },
      yaxis: {
        title: {
          text: 'Number of Innovations',
        
        },
        min: 0,
        max: 10,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); 
      try {
        const response = await fetch('http://localhost:8080/api/countByUniversityAndYear', {  method: "GET",  headers: {
          Authorization: `Bearer ${token}`,
         
          headers: {
            "Content-Type": "application/json",
          },
         
        }});
        const data = await response.json();

        // Transform API data into the format required for the chart
        const categories = Object.keys(data).flatMap((university) =>
          Object.keys(data[university])
        );
        const uniqueCategories = [...new Set(categories)];

        const series = Object.keys(data).map((university) => {
          const universityData = data[university];
          const seriesData = uniqueCategories.map((year) => universityData[year] || 0);
          return {
            name: university,
            data: seriesData,
          };
        });

        setState((prevState) => ({
          ...prevState,
          series,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: uniqueCategories,
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="line" height={330} width={500}/>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

// Export the component to make it available for other files
export default StatUnivYears;
