import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillArchiveFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import ApexChart from './ApexChart'; 
import Stats from './Stats'; 
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import SimpleForm from './SimpleForm';
import StatUniversity from './StatUniversity';
import StatUnivYears from './StatUnivYears';
function Home() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    axios.get('http://localhost:8080/api/stat' ,{  headers: {
      Authorization: `Bearer ${token}`, // 🔐 Ajout du token dans les headers
    }
   } )
      .then(response => {
        console.log("Données reçues du backend :", response.data);
        setStats(response.data);

        // Transformation des données pour les graphiques
        const formattedData = Object.entries(response.data).map(([key, value]) => ({
          name: key,
          count: value,  // On suppose que la valeur est un nombre
        }));

        setChartData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur API :", error);
        setError("Impossible de charger les données.");
        setLoading(false);
      });
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>
      <div className='main-cards'>
  {Object.entries(stats).map(([gender, count]) => (
    <div className='card' key={gender}>
      <div className='card-inner'>
        <h3>{gender === 'Femme' ? 'Femme' : 'Homme'}</h3>
        {gender === 'Femme' ? (
          <BsGenderFemale className='card_icon' />
        ) : (
          <BsGenderMale className='card_icon' />
        )}
      </div>
      <h1>{count}</h1>
    </div>
  ))}
</div>

      <div className='charts'>
        {/* Graphique à barres avec données API */}
       

        {/* Graphique en ligne avec données API */}
        <ApexChart />

        {/* Graphiques supplémentaires */}
         <StatUnivYears />

       

      </div>
    </main>
  );
}

export default Home;
