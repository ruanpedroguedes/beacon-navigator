import React, { useState, useEffect } from 'react';
import './InformeAdmin.css';

const InformeAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nome: '', dia: '', descricao: '' });
  const [cards, setCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch informes from the backend
    const fetchInformes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/informes');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Erro ao buscar informes:', error);
      }
    };

    fetchInformes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Limpa mensagem de erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/informes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setCards([...cards, data]);
        setFormData({ nome: '', dia: '', descricao: '' });
        setShowForm(false);
      } else {
        setErrorMessage(data.message || 'Erro ao criar informe');
      }
    } catch (error) {
      console.error('Erro ao criar informe:', error);
      setErrorMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="admin-page">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : '+'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-overlay">
          <label>
            Nome do Aluno:
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Dia da Semana:
            <select name="dia" value={formData.dia} onChange={handleChange} required>
              <option value="">Selecione um dia</option>
              <option value="Segunda-feira">Segunda-feira</option>
              <option value="Terça-feira">Terça-feira</option>
              <option value="Quarta-feira">Quarta-feira</option>
              <option value="Quinta-feira">Quinta-feira</option>
              <option value="Sexta-feira">Sexta-feira</option>
            </select>
          </label>
          <label>
            Descrição:
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </label>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Criar Informe</button>
        </form>
      )}

      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.nome}</h3>
            <p>{card.dia}</p>
            <p>{card.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformeAdmin;