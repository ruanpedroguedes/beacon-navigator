import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdicionarMembro from '../../components/AdicionarMembro/AdicionarMembro';
import './TurmaDetalhes.css';
const TurmaDetalhes = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/classes/${id}`);
        const data = await response.json();
        setClassDetails(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da turma:', error);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleMemberAdded = (updatedClass) => {
    setClassDetails(updatedClass);
  };

  if (!classDetails) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="turma-detalhes-container">
      <h1>{classDetails.name}</h1>
      <AdicionarMembro classId={id} onMemberAdded={handleMemberAdded} />
      <h2>Professor</h2>
      {classDetails.teacher ? (
        <p key={classDetails.teacher._id}>{classDetails.teacher.nome}</p>
      ) : (
        <p>Não tem professor aqui</p>
      )}
      <h2>Alunos</h2>
      {classDetails.students.length > 0 ? (
        <ul>
          {classDetails.students.map((student) => (
            <li key={student._id}>{student.nome}</li>
          ))}
        </ul>
      ) : (
        <p>Não tem alunos aqui</p>
      )}
    </div>
  );
};

export default TurmaDetalhes;
