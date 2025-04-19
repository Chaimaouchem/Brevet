import React, { useState } from 'react';
import { Card, Input, Button, TextField } from '@mui/material';
import './InnovationForm.css';

const InnovationForm = () => {
  const [innovation, setInnovation] = useState({
    titre: '',
    description: '',
    domaine: '',
    date_depot: '',
    date_obtention: '',
    date_annuite: '',
    etat: '',
    inventeurs: [{ nom: '', gender: '' }],
    institutions: [{ nom: '', university: { nom: '' } }], // Modified structure for institutions
  });

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
    const token = localStorage.getItem("token"); 
    e.preventDefault();
    console.log('Innovation ajoutée :', innovation);

    // API call to save the innovation
    try {
      const response = await fetch('http://localhost:8080/api', { method: 'POST', headers: {
        Authorization: `Bearer ${token}`,
         
        
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(innovation),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement de l\'innovation');
      }

      const data = await response.json();
      console.log('Réponse de l\'API:', data);
      // Handle success, like clearing the form or showing a success message
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <main className='main-container1'>
    <Card fullWidth  >
      <h2 className="text-xl mb-4">Ajouter une Innovation</h2>
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
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Date d'Obtention"
          name="date_obtention"
          type="date"
          value={innovation.date_obtention}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
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
          Enregistrer
        </Button>
      </form>
    </Card>
    </main>
  );
};

export default InnovationForm;
