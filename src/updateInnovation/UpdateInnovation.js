import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, TextField, Button } from '@mui/material';
 
const UpdateInnovation = () => {
  const { id } = useParams(); // si en mode édition, récupère l'ID
  const navigate = useNavigate();

  const [innovation, setInnovation] = useState({
    titre: '',
    description: '',
    domaine: '',
    date_depot: '',
    date_obtention: '',
    date_annuite: '',
    etat: '',
    inventeurs: [{ nom: '', gender: '' }],
    institutions: [{ nom: '', university: { nom: '' } }],
  });

  // Charger les données de l’innovation existante si en mode édition
  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:8080/api/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setInnovation(data))
        .catch((err) => console.error('Erreur de chargement:', err));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInnovation((prev) => ({ ...prev, [name]: value }));
  };

  const handleInventeurChange = (index, field, value) => {
    const newInventeurs = [...innovation.inventeurs];
    newInventeurs[index][field] = value;
    setInnovation({ ...innovation, inventeurs: newInventeurs });
  };

  const addInventeur = () => {
    setInnovation((prev) => ({
      ...prev,
      inventeurs: [...prev.inventeurs, { nom: '', gender: '' }],
    }));
  };

  const removeInventeur = (index) => {
    setInnovation((prev) => ({
      ...prev,
      inventeurs: prev.inventeurs.filter((_, i) => i !== index),
    }));
  };

  const handleInstitutionChange = (index, field, value) => {
    const newInstitutions = [...innovation.institutions];
    if (field === 'university.nom') {
      newInstitutions[index].university.nom = value;
    } else {
      newInstitutions[index][field] = value;
    }
    setInnovation({ ...innovation, institutions: newInstitutions });
  };

  const addInstitution = () => {
    setInnovation((prev) => ({
      ...prev,
      institutions: [...prev.institutions, { nom: '', university: { nom: '' } }],
    }));
  };

  const removeInstitution = (index) => {
    setInnovation((prev) => ({
      ...prev,
      institutions: prev.institutions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8080/api/${id}` : 'http://localhost:8080/api';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(innovation),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement de l'innovation");
      }

      const data = await response.json();
      console.log('Succès :', data);

      navigate('/table'); // redirige vers la liste par exemple
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <main className='main-container1'>
      <Card fullWidth>
        <h2 className="text-xl mb-4">{id ? "Modifier" : "Ajouter"} une Innovation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Titre"
            name="titre"
            value={innovation.titre}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="N° de dépôt"
            name="description"
            value={innovation.description}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Domaine"
            name="domaine"
            value={innovation.domaine}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Date de Dépôt"
            name="date_depot"
            type="date"
            value={innovation.date_depot}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Date d'Obtention"
            name="date_obtention"
            type="date"
            value={innovation.date_obtention}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          {innovation.inventeurs.map((inventeur, index) => (
            <div key={index} className="flex gap-2">
              <TextField
                label="Nom de l'Inventeur"
                value={inventeur.nom}
                onChange={(e) => handleInventeurChange(index, 'nom', e.target.value)}
                fullWidth
              />
              <TextField
                label="Genre de l'Inventeur"
                value={inventeur.gender}
                onChange={(e) => handleInventeurChange(index, 'gender', e.target.value)}
                fullWidth
              />
              <Button onClick={() => removeInventeur(index)} color="secondary">Supprimer</Button>
            </div>
          ))}
          <Button onClick={addInventeur} variant="contained" color="primary">
            Ajouter Inventeur
          </Button>

          {innovation.institutions.map((institution, index) => (
            <div key={index} className="flex gap-2">
              <TextField
                label="Nom de l'Institution"
                value={institution.nom}
                onChange={(e) => handleInstitutionChange(index, 'nom', e.target.value)}
                fullWidth
              />
              <TextField
                label="Nom de l'Université"
                value={institution.university.nom}
                onChange={(e) => handleInstitutionChange(index, 'university.nom', e.target.value)}
                fullWidth
              />
              <Button onClick={() => removeInstitution(index)} color="secondary">Supprimer</Button>
            </div>
          ))}
          <Button onClick={addInstitution} variant="contained" color="primary">
            Ajouter Institution
          </Button>

          <Button type="submit" variant="contained" color="primary">
            {id ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default UpdateInnovation;
