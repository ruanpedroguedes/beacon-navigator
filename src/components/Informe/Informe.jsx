import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth'; // Hook que você criou para pegar o token ou informações relacionadas
import './Informe.css'

const informe = () => {
  const { token } = useAuth();
  const [userName, setUserName] = useState('');
  const [showDays, setShowDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');

  // Mensagens para os dias da semana
  const messages = {
    segunda: 'Hoje a sua aula será com o professor Geraldo às 08:00 na sala 1402, no 15º andar!',
    terca: 'Hoje a sua aula será com a professora Maria às 09:30 na sala 1203, no 12º andar!',
    quarta: 'Hoje a sua aula será com o professor João às 10:00 na sala 1501, no 15º andar!',
    quinta: 'Hoje a sua aula será com a professora Ana às 14:00 na sala 1304, no 13º andar!',
    sexta: 'Hoje a sua aula será com o professor Paulo às 16:00 na sala 1102, no 11º andar!',
  };

  useEffect(() => {
    // Simula a obtenção do nome do usuário usando o token
    const fetchUserName = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name || 'Usuário');
        } else {
          console.error('Erro na resposta do servidor:', response.status);
          setUserName('Usuário'); // Nome padrão em caso de erro
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
        setUserName('Usuário'); // Nome padrão caso ocorra um erro
      }
    };

    if (token) {
      fetchUserName();
    }
  }, [token]);

  return (
    <div className="weekly-greeting">
      <h1>Bem-vindo(a), {userName}!</h1>

      <button onClick={() => setShowDays(!showDays)} className="week-button">
        Semana
      </button>

      {showDays && (
        <div className="day-selector">
          {Object.keys(messages).map((day) => (
            <button key={day} onClick={() => setSelectedDay(day)} className="day-button">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>
      )}

      {selectedDay && (
        <div className="day-card-overlay">
          <div className="day-card">
            <h2>Bom dia, {userName}!</h2>
            <p>{messages[selectedDay]}</p>
            <button onClick={() => setSelectedDay('')} className="back-button">
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default informe;
