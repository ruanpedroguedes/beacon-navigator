import React, { useState } from 'react';
import './btnInformes.css'; // Importando o arquivo CSS externo

const InformeComponent = () => {
  const [informes, setInformes] = useState([]);
  const [showInformes, setShowInformes] = useState(false);

  const fetchInformes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/informes');
      const data = await response.json();
      setInformes(data);
      setShowInformes(true); // Exibir informes após carregar
    } catch (error) {
      console.error('Erro ao carregar informes:', error);
    }
  };

  return (
    <div className="informe-container">
      <button onClick={fetchInformes} className="load-button">Carregar Informes</button>
      {showInformes && (
        <div className="informes-list">
          {informes.map((informe) => (
            <div key={informe._id} className="informe-card">
              <h3>{informe.nome}</h3>
              <p>{informe.dia}</p>
              <p>{informe.descricao}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InformeComponent;