import React from 'react';
import './Location.css';

const Location = () => {
    const floors = [
      {
        name: '1º Andar',
        details: ['Recepção 🛋️', 'Sala de Espera ⏳', 'Auditório A 🎤'],
      },
      {
        name: '2º Andar',
        details: ['Salas de Reunião 201 e 202 🗣️', 'Auditório B 🎥'],
      },
      {
        name: '3º Andar',
        details: ['Escritórios 🖇️', 'Café ☕', 'Auditório C 🎭'],
      },
      {
        name: '4º Andar',
        details: ['Biblioteca 📚', 'Laboratório de Informática 💻'],
      },
      {
        name: '5º Andar',
        details: ['Sala de Treinamento 🎓', 'Lounge de Descanso 🛋️'],
      },
      {
        name: '6º Andar',
        details: ['Coworking 🖥️', 'Auditório D 🎙️'],
      },
      {
        name: '7º Andar',
        details: ['Sala de Projeção 📽️', 'Área de Jogos 🎮'],
      },
      {
        name: '8º Andar',
        details: ['Refeitório 🍽️', 'Sala de TV 📺'],
      },
      {
        name: '9º Andar',
        details: ['Espaço Fitness 🏋️', 'Sauna 🧖'],
      },
      {
        name: '10º Andar',
        details: ['Terraço 🌇', 'Jardim Suspenso 🌿'],
      },
    ];
  

  return (
    <div className="floor-container">
      <h1 className="title">Informações dos Andares</h1>
      {floors.map((floor, index) => (
        <div className="floor-card" key={index}>
          <h2 className="floor-name">{floor.name}</h2>
          <ul className="floor-details">
            {floor.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Location;
