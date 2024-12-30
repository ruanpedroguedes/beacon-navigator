import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CriarTurma.css';

const CriarTurma = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/classes');
        const data = await response.json();
        setClasses(data);
        console.log(data);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleCreateClass = async () => {
    try {
      console.log(title, description);
      const response = await fetch('http://localhost:5000/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title, description }),
      });
      const data = await response.json();
      setClasses([...classes, data]);
      setShowForm(false);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao criar turma:', error);
    }
  };

  const handleCardClick = (classId) => {
    navigate(`/admin/turmas-detalhes/${classId}`);
  };

  return (
    <div className="criar-turma-container">
      <button className="criar-turma-button" onClick={() => setShowForm(true)}>+</button>
      {showForm && (
        <div className="criar-turma-form">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="cancel-button" onClick={() => setShowForm(false)}>Cancelar</button>
          <button className="create-button" onClick={handleCreateClass}>Criar</button>
        </div>
      )}
      <div>
        {classes.map((classItem) => (
          <div key={classItem._id} className="class-card" onClick={() => handleCardClick(classItem._id)}>
            <h3>{classItem.name || ''}</h3>
            <p>{classItem.description || ''}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriarTurma;