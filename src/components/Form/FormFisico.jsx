import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormCadastro.css';
import './Input.css';

const FormCadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    role: 'student', // Por padrão, o tipo de usuário será Aluno
    isPCD: false,
    pcdDetails: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrorMessage(''); // Limpa mensagens de erro
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    try {
      console.log(formData);
      // Simula envio para o backend
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login'); // Redireciona para a página de login após o cadastro
      } else {
        setErrorMessage(data.message || 'Erro ao realizar cadastro.');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      setErrorMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1>Cadastre-se</h1>
        </div>

        <form onSubmit={handleSubmit} className="form-fields">
          <div className="input-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              placeholder="Insira seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Insira seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />

            <label>Confirmar Senha</label>
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />

            <label>Tipo de Usuário</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Aluno</option>
              <option value="teacher">Professor</option>
              <option value="admin">Administrador</option>
            </select>
            
            <label>
              <input
                type="checkbox"
                name="isPCD"
                checked={formData.isPCD}
                onChange={handleChange}
              />
              Sou PCD (Pessoa com Deficiência)
            </label>

            {formData.isPCD && (
              <>
                <label>Detalhes da Deficiência</label>
                <input
                  type="text"
                  name="pcdDetails"
                  placeholder="Descreva sua deficiência"
                  value={formData.pcdDetails}
                  onChange={handleChange}
                />
              </>
            )}
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="form-button">
            Cadastrar
          </button>
        </form>

        <div className="form-footer">
          <p>
            Já possui uma conta?
            <span className="login-link">
              <a href="/login"> Faça Login</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormCadastro;