import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from "styled-components";


const SimpleForm = () => {
  const theme = {
    background: 'rgba(255, 255, 255, 1)',
  
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#3c4b64',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3c4b64',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    };
    const BotRedirect = ({ url, message }) => {
      return (
        <div>
          <a href={url} target="_blank">
            {message}
          </a>
        </div>
      );
    };
    
  
{
      return (
        <ThemeProvider theme={theme}>
        <ChatBot 
        headerTitle = "Service Client"
        speechSynthesis={{ enable: true, lang: 'fr' }}
        recognitionEnable={true}
          steps={[
            {
              id: '1',
              message: 'Votre nom?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Bonjour {previousValue}! Etes vous un nouveau client?',
              trigger: '4',
            },
            {
              id: '4',
              options: [
                { value: 'oui', label: 'oui' , trigger: '5' },
                { value: 'non', label: 'non', trigger: '70' },
              ],
            },

          
            {
              id: '5',
              message: 'Est ce que vous voulez une assistance cher nouveau client?',
              trigger: '6',
            },
            {
              id: '70',
              message: 'Est ce que vous voulez une assistance cher fidéle client?',
              trigger: '6',
            },
            {

              id: '6',
              options: [
                { value: 'oui', label: 'oui' , trigger: '10' },
                { value: 'non', label: 'non', trigger: 'end' },
              ],
            },
            {
              id: '10',
              message: 'quels informations vous voulez savoir?',
              trigger: '30',
            },
            {
              id: '30',
              options: [
                { value: 'INFOCONTACT', label: 'INFOCONTACT', trigger: '40' },
                { value: 'INFOTUS', label: 'INFOTUS', trigger: '41' },
                { value: 'SITEOFFICIEL', label: 'SITEOFFICIEL', trigger: '42' },
                { value: 'PRODUITS', label: 'PRODUITS', trigger: '43' },
              ],
            },
         


            {id: '40',
              options: [
                { value: 'email', label: 'EmailTUS', trigger: '11' },
                { value: 'Contact', label: 'Contact', trigger: '16' },
                
                { value: 'AdresseTUN', label: 'AdresseTUN', trigger: '12' },
                { value: 'AdresseSousse', label: 'AdresseSousse', trigger: '13' },
                { value: 'AdresseSfax', label: 'AdresseSfax', trigger: '14' },
                { value: 'Telephone', label: 'Telephone', trigger: '15' },
                { value: 'Plus de choix', label: 'Plus de choix', trigger: '30' },
              
              ],
            },
            {
              id: '41',
              message: 'TUS est un Fournisseur matériel vidéosurveillance et pointage est synonyme d’innovation, de perfection et de professionnalisme. Cette vision, s’applique à notre plus grande priorité : nos clients.',
              trigger: '30',
            },
            {
              id: '42',
              component: (
                <BotRedirect
                message="TUS"
                url="https://www.tus.com.tn/"
              />
            ),

              trigger: '30',
            },
            
            {id: '43',
              options: [
                { value: 'Incendie', label: 'Incendie', trigger: '50' },
                { value: 'Smart Home', label: 'Smart Home', trigger: '51' },
                
                { value: 'Câbles', label: 'Câbles', trigger: '52' },
                { value: 'Covid-19', label: 'Covid-19', trigger: '53' },
                { value: 'Moulure', label: 'Moulure', trigger: '54' },
                { value: 'Pos', label: 'Pos', trigger: '55' },
                { value: 'Vidéosurveillance', label: 'Vidéosurveillance', trigger: '56' },
                { value: 'Contrôle d’accès', label: 'Contrôle d’accès', trigger: '57' },
                { value: 'Plus de choix', label: 'Plus de choix', trigger: '30' },
              
              ],
            },
            {
              id: '42',
              component: (
                <BotRedirect
                message="TUS"
                url="https://www.tus.com.tn/"
              />
            ),

              trigger: '30',
            },
            {
              id: '50',
              component: (
                <BotRedirect
                message="Incendie"
                url="https://www.tus.com.tn/categorie/incendie/"
              />
            ),

              trigger: '43',
            },
            {
              id: '51',
              component: (
                <BotRedirect
                message="Smart-home"
                url="https://www.tus.com.tn/categorie/smart-home/"
              />
            ),

              trigger: '43',
            },
            {
              id: '52',
              component: (
                <BotRedirect
                message="Cables"
                url="https://www.tus.com.tn/categorie/cables/"
              />
            ),

              trigger: '43',
            },
            {
              id: '53',
              component: (
                <BotRedirect
                message="Covid-19"
                url="https://www.tus.com.tn/categorie/covid-19-produits/"
              />
            ),

              trigger: '43',
            },
            {
              id: '54',
              component: (
                <BotRedirect
                message="Moulure"
                url="https://www.tus.com.tn/categorie/moulure/"
              />
            ),

              trigger: '43',
            },
            {
              id: '55',
              component: (
                <BotRedirect
                message="Pos"
                url="https://www.tus.com.tn/categorie/pos/"
              />
            ),

              trigger: '43',
            },
            {
              id: '56',
              component: (
                <BotRedirect
                message="Vidéosurveillance"
                url="https://www.tus.com.tn/categorie/distributeur-de-materiel-videosurveillance-en-tunisie/"
              />
            ),

              trigger: '43',
            },
            {
              id: '57',
              component: (
                <BotRedirect
                message="Contrôle d’accès"
                url="https://www.tus.com.tn/categorie/controle-dacces/"
              />
            ),

              trigger: '43',
            },
            {
              id: '42',
              component: (
                <BotRedirect
                message="TUS"
                url="https://www.tus.com.tn/"
              />
            ),

              trigger: '30',
            },
            {
              id: '42',
              component: (
                <BotRedirect
                message="TUS"
                url="https://www.tus.com.tn/"
              />
            ),

              trigger: '30',
            },
            {
              id: '42',
              component: (
                <BotRedirect
                message="TUS"
                url="https://www.tus.com.tn/"
              />
            ),

              trigger: '30',
            },

            {
              id: '11',
              message: 'info@tus.com.tn',
              trigger: '40',
            },
            {
              id: '12',
              message: 'Tunis : 12 Rue Béchir Methenni - Menzah 8 - 2037 Ariana',
              trigger: '40',
            },
            {
              id: '13',
              message: 'Sousse : 176, Rue de Chypre - Sahloul - 4054',
              trigger: '40',
            },
            {
              id: '14',
              message: 'Sfax : Route de l’Aéroport Km 2.5, 3018 Sfax',
              trigger: '40',
            },
            {
              id: '15',
              message: ' +216 70 240 840  ou +216 70 240 850',
              trigger: '40',
            },
            {
              id: '16',
              options: [
                { value: 'commercial', label: 'commercial', trigger: '17' },
                { value: 'sales', label: 'sales', trigger: '18' },
                { value: 'bayar anis', label: 'bayar anis', trigger: '19' },
                { value: 'mejdi', label: 'mejdi', trigger: '20' },
                { value: 'makram', label: 'makram', trigger: '21' },
                { value: 'nizar', label: 'nizar', trigger: '22' },
                { value: 'talel', label: 'talel', trigger: '23' },
                { value: 'plus de choix', label: 'plus de choix', trigger: '30' },
            ],
            },
            {
              id: '17',
              message: 'commercial@tus.com.tn',
              trigger: '16',
            },
            {
              id: '18',
              message: 'sales@tus.com.tn',
              trigger: '16',
            },
            {
              id: '19',
              message: 'bayaranis@tus.com.tn',
              trigger: '16',
            },
            {
              id: '20',
              message: 'mejdih@tus.com.tn',
              trigger: '16',
            },
            {
              id: '21',
              message: 'makram.ab@tus.com.tn',
              trigger: '16',
            },
            {
              id: '22',
              message: 'nizar.baklouti@tus.com.tn',
              trigger: '16',
            },
            {
              id: '23',
              message: 'talel.marouani@tus.com.tn',
              trigger: '16',
            },
            {
              id: 'end',
              message: 'A bientot!',
              end: true,
            },
          ]}
        />
          </ThemeProvider>
      );
    }
  }
  
  export default SimpleForm;