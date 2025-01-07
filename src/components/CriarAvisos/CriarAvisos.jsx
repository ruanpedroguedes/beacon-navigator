import React, { useEffect, useState } from 'react';
import './CriarAvisos.css';
import useAuth from '../../hooks/useAuth';

const CriarAvisos = ({ classId }) => {
  const { token } = useAuth();
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', date: '' });

  useEffect(() => {
    const fetchAvisos = async () => {
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
          throw new Error(data.message || 'Erro ao buscar avisos');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/avisos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, classId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar aviso');
      }
      setAvisos([...avisos, data]);
      setShowForm(false);
      setFormData({ title: '', content: '', date: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      <button id='addAvisos' onClick={() => setShowForm(true)}>+</button>
      {showForm && (
        <>
          <div className="overlay-background" onClick={() => setShowForm(false)}></div>
          <div className="form-overlay">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Título"
                required
              />
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Conteúdo"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Criar Aviso</button>
            </form>
          </div>
        </>
      )}
      <div id="avisos">
        {avisos.map((aviso) => (
          <div key={aviso._id} className="aviso-item">
            <h3>{aviso.title}</h3>
            <p>{aviso.content}</p>
            <p>Criado por: {aviso.createdBy.nome}</p>
            <p>Data: {new Date(aviso.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriarAvisos;