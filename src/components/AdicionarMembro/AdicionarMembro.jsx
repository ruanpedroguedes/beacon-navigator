import React, { useState } from 'react';
import './AdicionarMembro.css';

const AdicionarMembro = ({ classId, onMemberAdded }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSearchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/search?name=${userName}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleAddMember = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/classes/add-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId, userId: selectedUserId, role }),
      });
      const data = await response.json();
      onMemberAdded(data);
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('student');
      setUsers([]);
      setSelectedUserId('');
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao adicionar membro à turma:', error);
    }
  };

  return (
    <div className="adicionar-membro-container">
      <button id='btnmembro' onClick={() => setShowForm(true)}>+</button>
      {showForm && (
        <div className="adicionar-membro-form">
          <button className="close-button" onClick={() => setShowForm(false)}>X</button>
          <input
            type="text"
            placeholder="Nome do Usuário"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleSearchUsers}>Buscar Usuários</button>
          {users.length > 0 && (
            <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
              <option value="">Selecione um usuário</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.nome} ({user.email})
                </option>
              ))}
            </select>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Aluno</option>
            <option value="teacher">Professor</option>
          </select>
          <button onClick={handleAddMember}>Adicionar Membro</button>
        </div>
      )}
    </div>
  );
};

export default AdicionarMembro;