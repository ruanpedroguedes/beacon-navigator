import React, { useState, useEffect } from 'react';

const StudentInforme = ({ alunoNome }) => {
  const [informes, setInformes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/informes/aluno/${alunoNome}`);
        const data = await response.json();

        if (response.ok) {
          setInformes(data);
        } else {
          setErrorMessage(data.message || 'Erro ao buscar informes');
        }
      } catch (error) {
        console.error('Erro ao buscar informes:', error);
        setErrorMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      }
    };

    if (alunoNome) {
      fetchInformes();
    }
  }, [alunoNome]);

  return (
    <div className="aluno-informes">
      <h2>Informes do Aluno</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="informes-container">
        {informes.map((informe, index) => (
          <div key={index} className="informe-card">
            <h3>{informe.nome}</h3>
            <p>{informe.dia}</p>
            <p>{informe.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentInforme;