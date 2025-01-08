import React, { useEffect, useState } from 'react';
import './StudentClassAvisos.css';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const TurmasAvisosContent = () => {
  const { classId } = useParams(); // Obtém o classId da URL
  const { token } = useAuth(); // Obtém o token de autenticação
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvisos = async () => {
      if (!token) {
        setError('Token não encontrado. Faça login novamente.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/avisos/${classId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Erro ao buscar avisos: ${response.statusText}`);
        }

        setAvisos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvisos();
  }, [classId, token]);

  if (loading) {
    return <p>Carregando avisos...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div id="aviso">
      <h2>Avisos da Turma</h2>
      {avisos.length === 0 ? (
        <p>Não há avisos para esta turma.</p>
      ) : (
        <div className="avisos-container">
          {avisos.map((aviso) => (
            <div key={aviso._id} className="aviso-card">
              <h3>{aviso.title}</h3>
              <p>{aviso.content}</p>
              <p>Data: {new Date(aviso.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TurmasAvisosContent;
