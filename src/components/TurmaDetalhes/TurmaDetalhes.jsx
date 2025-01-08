import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Adicionado useNavigate
import AdicionarMembro from '../../components/AdicionarMembro/AdicionarMembro';
import './TurmaDetalhes.css';

const TurmaDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Instancia o hook de navegação
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
        <div key={classDetails.teacher._id} className="card">
          <div className="card-info">
            <span className="card-name">{classDetails.teacher.nome}</span>
            <span className="card-email">{classDetails.teacher.email}</span>
          </div>
        </div>
      ) : (
        <p>Não tem professor aqui</p>
      )}

      <h2>Alunos</h2>
      {classDetails.students.length > 0 ? (
        <ul className="students-list">
          {classDetails.students.map((student) => (
            <li key={student._id} className="card">
              <div className="card-info">
                <span className="card-name">{student.nome}</span>
                <span className="card-email">{student.email}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não tem alunos aqui</p>
      )}

      {/* Seta de voltar */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/admin/dashboard')}>
          ← Voltar
        </button>
      </div>
    </div>
  );
};

export default TurmaDetalhes;
