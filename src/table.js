import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token"); 
      
      fetch('http://localhost:8080/api/all', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json()) // ✅ convertir en JSON
        .then((data) => {
          const today = new Date();
          const notifications = [];
      
          if (Array.isArray(data)) {
            const updatedData = data.map((item) => {
              if (item.date_annuite) {
                const annuiteDate = new Date(item.date_annuite);
                const isSameDay =
                  annuiteDate.getDate() === today.getDate() &&
                  annuiteDate.getMonth() === today.getMonth() &&
                  annuiteDate.getFullYear() === today.getFullYear();
      
                if (isSameDay) {
                  notifications.push(`🛎️ Annuité aujourd’hui pour "${item.titre}"`);
                }
              }
              return item;
            });
      
            if (notifications.length > 0) {
              alert(notifications.join("\n"));
            }
      
            setData(updatedData);
          } else {
            console.error("Les données de l'API ne sont pas un tableau");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur API :", error);
          setError("Impossible de charger les données.");
          setLoading(false);
        });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token"); 

    axios
      .delete(`http://localhost:8080/api/${id}`, {   headers: {
        Authorization: `Bearer ${token}`,
       
        
          "Content-Type": "application/json",
        
       
      }})
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
        alert("Erreur serveur : impossible de supprimer.");
      });
  };

  const columns = [
    { field: "titre", headerName: "Titre", width: 200, filterable: true },
    { field: "description", headerName: "N° de dépôt", width: 200, filterable: true },
    { field: "domaine", headerName: "Domaine", width: 150, filterable: true },
    { field: "date_depot", headerName: "Date de Dépôt", width: 150, filterable: true },
    { field: "date_obtention", headerName: "Date d'Obtention", width: 150, filterable: true },
    { field: "date_annuite", headerName: "Date Annuité", width: 150, filterable: true },
    {
      field: "inventeurs",
      headerName: "Inventeurs",
      width: 250,
      renderCell: (params) =>
        params.value?.length
          ? params.value.map((i) => i.nom).join(", ")
          : "Aucun",
    },
    {
      field: "institutions",
      headerName: "Institutions",
      width: 250,
      renderCell: (params) =>
        params.value?.length
          ? params.value.map((i) => i.nom).join(", ")
          : "Aucune",
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (data) => (
        <div>
          <button onClick={() => handleDelete(data.id)}>Delete </button>
        </div>

      ),
    },
    {
      field: 'ac',
      headerName: 'Actions',
      width: 150,
      renderCell: (data) => (
        <div>
          <button  onClick={() => navigate(`/modifier/${data.row.id}`)}> Modifier</button>
        </div>
      ),
    },
    {
      field: 'act',
      headerName: 'Action',
      width: 150,
      renderCell: (data) => (
        <div>
          <button   onClick={() => navigate(`/detail/${data.row.id}`)}> detail </button>

    </div>
      ),
    },
  ];

  // ✅ Export Excel
  const exportToExcel = () => {
    const headers = columns
      .filter((col) => col.field !== "actions")
      .map((col) => col.headerName);

    const rows = data.map((item) => {
      return columns
        .filter((col) => col.field !== "actions")
        .map((col) => {
          const value = item[col.field];
          if (Array.isArray(value)) {
            return value.map((v) => v.nom).join(", ");
          }
          return value || "";
        });
    });

    const worksheetData = [headers, ...rows];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Innovations");

    XLSX.writeFile(workbook, "innovations.xlsx");
  };

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="wrapper d-flex flex-column min-vh-100">
      <div style={{ margin: "20px" }}>
        <button onClick={exportToExcel} style={{ padding: "10px 16px", marginBottom: "10px" }}>
          📥 Télécharger Excel
        </button>
        <DataGrid
          style={{ width: "1200px" }}
          rows={data}
          columns={columns}
          pageSize={6}
          rowHeight={60}
          autoHeight
         
          localeText={{
            toolbarColumns: "Les colonnes",
            toolbarFilters: "Filtrer",
            toolbarDensity: "Densité",
            toolbarExport: "Télécharger",
          }}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
};

export default Table;
