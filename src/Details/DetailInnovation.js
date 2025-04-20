import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const DetailInnovation = () => {
  const { id } = useParams();
  const [innovation, setInnovation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement de l'innovation.");
        }
        return res.json();
      })
      .then((data) => {
        setInnovation(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Wrapper><p>Chargement...</p></Wrapper>;
  if (!innovation) return <Wrapper><p>Innovation introuvable.</p></Wrapper>;

  return (
    <Wrapper>
      <Card>
        <Title>Détails de l'Innovation</Title>
        <Info><strong>Titre :</strong> {innovation.titre}</Info>
        <Info><strong>Description :</strong> {innovation.description}</Info>
        <Info><strong>Domaine :</strong> {innovation.domaine}</Info>
        <Info><strong>Date de Dépôt :</strong> {innovation.date_depot}</Info>
        <Info><strong>Date d'Obtention :</strong> {innovation.date_obtention}</Info>
        <Info><strong>Date Annuité :</strong> {innovation.date_annuite}</Info>
        <Info><strong>État :</strong> {innovation.etat}</Info>

        <SectionTitle>Inventeurs</SectionTitle>
        <ul>
          {innovation.inventeurs?.map((inv, idx) => (
            <li key={idx}>{inv.nom} ({inv.gender})</li>
          ))}
        </ul>

        <SectionTitle>Institutions</SectionTitle>
        <ul>
          {innovation.institutions?.map((inst, idx) => (
            <li key={idx}>
              {inst.nom} — Université : {inst.university?.nom}
            </li>
          ))}
        </ul>

        <BackLink to="/">🔙 Retour à la liste</BackLink>
      </Card>
    </Wrapper>
  );
};

export default DetailInnovation;

// ----------------------------
// Styled Components
// ----------------------------
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  min-height: 100vh;
  background-color: #f4f7f9;

  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin-top: 50px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const SectionTitle = styled.h4`
  margin-top: 30px;
  margin-bottom: 10px;
  color: #444;
`;

const Info = styled.p`
  margin: 6px 0;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 30px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
