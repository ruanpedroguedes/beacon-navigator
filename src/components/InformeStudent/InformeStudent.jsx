import React, { useState, useEffect } from 'react';
import './InformeStudent.css';
import useAuth from '../../hooks/useAuth'; // Importa o hook useAuth

const InformeStudent = () => {
  const { user } = useAuth(); // Obtém o nome do aluno logado
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/informes/aluno/${user}`);
        const data = await response.json();
        setInformes(data);
      } catch (error) {
        console.error('Erro ao buscar informes:', error);
      }
    };

    if (user) {
      fetchInformes();
    }
  }, [user]);

  return (
    <div>
      <h1>Informes de {user}</h1>
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

export default InformeStudent;