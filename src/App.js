import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    ownershipStatus: '',
    heatingCount: 0
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'Prénom est requis';
    if (!formData.lastName) errors.lastName = 'Nom est requis';
    if (!formData.email) errors.email = 'Email est requis';
    if (!formData.phone) errors.phone = 'Téléphone est requis';
    if (formData.phone && formData.phone.length !== 10) errors.phone = 'Le téléphone doit contenir 10 chiffres';
    if (!formData.address) errors.address = 'Adresse est requise';
    if (!formData.ownershipStatus) errors.ownershipStatus = 'Statut de propriétaire ou locataire est requis';
    if (!formData.heatingCount || formData.heatingCount < 0) errors.heatingCount = 'Nombre de chauffages est requis et doit être positif';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setErrorMessage('Veuillez corriger les erreurs avant de soumettre.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Formulaire envoyé avec succès.');
        setErrorMessage('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          ownershipStatus: '',
          heatingCount: 0
        });
        setTimeout(() => {
          setSuccessMessage('');
        }, 9000); // Message disparaît après 9 secondes
      } else {
        setErrorMessage(data.error || 'Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
        setSuccessMessage('');
      }
      console.log('Réponse du serveur:', data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      setErrorMessage('Erreur lors de l\'envoi des données. Veuillez réessayer.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <title>CDC Thermostats</title>
        <div className='header_and_title'> 
          <h1>Installation de Thermostats Connectés</h1>
        </div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Installation de thermostats connectés pour les résidences à Paris. Économisez de l'énergie avec nos solutions avancées et bénéficiez d'aides financières. Testez votre éligibilité maintenant!" />
        <meta name="keywords" content="thermostat connecté, installation thermostat Paris, économies d'énergie, aide financière thermostat, régulation température Paris, thermostat programmable, chauffage connecté, énergie renouvelable" />
        <meta name="author" content="Votre Nom ou Nom de l'entreprise" /> 

        {/* Sections d'informations */}
        <section>
          <div className='thermostat_image'>
            <h2>Qu'est-ce qu'un Thermostat Connecté?</h2>
            <p>
              Un thermostat connecté permet d’ajuster la température de votre logement en temps réel, en fonction de la météo, du moment de la journée ou de paramétrages de votre choix. Vous pouvez désormais bénéficier d’une aide financière lorsque vous faites installer un tel dispositif chez vous, que vous soyez propriétaire ou locataire, et quel que soit votre niveau de revenu.
            </p>
          </div>
        </section>
        <div className='planthermo'> 
          <section>
            <h2>Plan Thermostat du Gouvernement</h2>
            <p>
              Dans le cadre d’un « plan thermostat », le Gouvernement a notamment publié une plaquette d’information destinée aux particuliers afin de présenter différents renseignements relatifs à l’installation d’un système de régulation de la température dans un logement ; et lancé le dispositif « Coup de pouce pilotage connecté du chauffage pièce par pièce ».
            </p>
            <p>
              Il s’agit d’une aide financière dont vous pouvez bénéficier si vous faites installer un thermostat programmable connecté dans votre logement entre le 1er décembre 2023 et le 31 décembre 2024.
            </p>
          </section>
        </div>
        
        <section>
          <h2>Avantages des Thermostats Connectés</h2>
          <p>
            Un thermostat programmable connecté vous permet de définir la température des différentes pièces de votre logement munies d’un système de chauffage (radiateur, plancher chauffant…), notamment en fonction de plages horaires.
          </p>
          <p>
            Le caractère connecté du thermostat vous permet par ailleurs de contrôler le dispositif à distance via votre téléphone, et donc de régler la température de votre logement en étant à l'extérieur. Vos consommations d’énergie sont ainsi plus proches de vos besoins réels.
          </p>
          <p>
            Vous pouvez par exemple indiquer que la température des différentes pièces de votre logement doit diminuer quotidiennement à partir de l’heure à laquelle vous partez pour vous rendre à votre lieu de travail ; puis, vous pouvez augmenter à distance la température de certaines pièces lorsque vous êtes proche de votre domicile pour bénéficier immédiatement d’un niveau de chaleur qui vous convienne. Vous pouvez modifier, sans difficulté, une diminution programmée de la température si vous télétravaillez un jour de manière exceptionnelle.
          </p>
          <p>
            La régulation de la température peut par ailleurs être adaptée à chaque pièce. Par exemple, la salle de bains, la salle de séjour et la chambre n’ont pas besoin d’être chauffées de la même manière et aux mêmes heures.
          </p>
        </section>
        <div className='ppandform'> 
          <div className='pointspositifs'>
            <h3>Points Positifs des Thermostats</h3>
            <p>
              Un thermostat électrique pour radiateur est un dispositif qui contrôle la température de votre radiateur en fonction de vos préférences de confort. Voici comment il fonctionne concrètement :
            </p>
            <p>
              Capteur de température : Le thermostat est équipé d'un capteur de température qui mesure la température ambiante de la pièce où il est installé.
            </p>
            <p>
              Réglage de la température : Vous pouvez régler la température désirée à l’aide de votre application. Ce réglage détermine la température à laquelle le radiateur doit maintenir la pièce.
            </p>
            <p>
              Comparaison et contrôle : Une fois que vous avez réglé la température, le thermostat compare la température ambiante mesurée par son capteur à la température désirée que vous avez sélectionnée. S'il détecte que la température ambiante est inférieure à la température désirée, il envoie un signal au radiateur pour qu'il commence à chauffer.
            </p>
            <p>
              Activation du radiateur : Le thermostat envoie un signal électrique au radiateur pour l'activer. Le radiateur se met alors en marche et commence à chauffer le liquide ou l'air à l'intérieur, selon le type de radiateur.
            </p>
            <p>
              Maintien de la température : Une fois que la température ambiante atteint le niveau que vous avez réglé, le thermostat coupe l'alimentation électrique du radiateur. Cela évite que la pièce ne devienne trop chaude et permet d'économiser de l'énergie.
            </p>
            <p>
              En clair, le thermostat permet aux ménages de réguler la température de leur logement et de faire jusqu'à 25% d'économies d'énergie.
            </p>
            <ul>
              <li>ROBINET THERMOSTATIQUE = CHAUDIÈRE À GAZ INDIVIDUELLE</li>
              <li>THERMOSTAT ÉLECTRIQUE = RADIATEURS ÉLECTRIQUES</li>
            </ul>
            <p>
              Pourquoi c’est gratuit ?
            </p>
            <p>
              Le programme est financé par le PN CEE (certificat d’économies d'énergies) représenté par les grandes entreprises polluantes telles que Total Energie, Esso, Airbus et Air France, qui financent les travaux de rénovation énergétique des foyers français au lieu de payer des taxes à l'État.
            </p>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="form-container">
            <h3 className='eligib'>Faire un test d'éligibilité :</h3>
            <div className="form-group">
              <label>Prénom :</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              {validationErrors.firstName && <span className="error-text">{validationErrors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Nom :</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              {validationErrors.lastName && <span className="error-text">{validationErrors.lastName}</span>}
            </div>
            <div className="form-group">
              <label>Email :</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              {validationErrors.email && <span className="error-text">{validationErrors.email}</span>}
            </div>
            <div className="form-group">
              <label>Téléphone :</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              {validationErrors.phone && <span className="error-text">{validationErrors.phone}</span>}
            </div>
            <div className="form-group">
              <label>Adresse :</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              {validationErrors.address && <span className="error-text">{validationErrors.address}</span>}
            </div>
            <div className="form-group">
              <label>Statut :</label>
              <select name="ownershipStatus" value={formData.ownershipStatus} onChange={handleChange} required>
                <option value="">Sélectionnez...</option>
                <option value="Propriétaire">Propriétaire</option>
                <option value="Locataire">Locataire</option>
              </select>
              {validationErrors.ownershipStatus && <span className="error-text">{validationErrors.ownershipStatus}</span>}
            </div>
            <div className="form-group">
              <label>Nombre de chauffages :</label>
              <input type="number" name="heatingCount" value={formData.heatingCount} onChange={handleChange} required />
              {validationErrors.heatingCount && <span className="error-text">{validationErrors.heatingCount}</span>}
            </div>
            <button type="submit">Envoyer</button>
            {successMessage && <div className="success-message">{successMessage}</div>}
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
