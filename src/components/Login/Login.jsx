import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import './Input.css';

const FormLogin = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Limpa mensagem de erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.email || !formData.senha) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Simulando uma requisição para o backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona com base no tipo de usuário
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (data.role === 'teacher') {
          navigate('/teacher-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        setErrorMessage(data.message || 'Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      setErrorMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1>Entrar</h1>
        </div>

        <form onSubmit={handleSubmit} className="form-fields">
          <div className="input-group">
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
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="form-button">
            Entrar
          </button>
        </form>

        <div className="form-footer">
          <p>
            Não possui uma conta?
            <span className="cadastro-link">
              <a href="/cadastro"> Cadastre-se</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
