import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const TeacherClasses = () => {
  const { token } = useAuth(); // Obtém o token do hook
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!token) {
        setError('Token não encontrado. Faça login novamente.');
        return;
      }
    
      setLoading(true);
      setError(null);
    
      try {
        console.log('Token enviado no cabeçalho:', token); // Log do token
    
        const response = await fetch(`http://localhost:5000/api/classes/teacher-classes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log('Resposta da requisição:', response); // Log da resposta completa
    
        if (!response.ok) {
          throw new Error(`Erro ao buscar turmas: ${response.statusText}`);
        }
    
        const data = await response.json();
        setClasses(data);
      } catch (err) {
        console.error('Erro ao buscar turmas:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchClasses();
  }, [token]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      <h2>Minhas Turmas</h2>
      {classes.length === 0 ? (
        <p>Você ainda não está vinculado a nenhuma turma.</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem._id}>
              <h3>{classItem.name}</h3>
              <p>{classItem.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherClasses;
