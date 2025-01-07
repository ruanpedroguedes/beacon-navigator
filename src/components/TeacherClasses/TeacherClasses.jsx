import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherClasses.css';
import useAuth from '../../hooks/useAuth';

const TeacherClasses = () => {
  const { token } = useAuth(); // Obtém o token do hook
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Erro ao buscar turmas: ${response.statusText}`);
        }
    
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

  const handleDoubleClick = (classId) => {
    navigate(`/teacher/avisos/${classId}`);
  };

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
        <div id="turmas">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="class-item"
              onDoubleClick={() => handleDoubleClick(classItem._id)}
            >
              <h3>{classItem.name}</h3>
              <p>{classItem.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherClasses;