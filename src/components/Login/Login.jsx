// FormLogin.js

import React, { useState } from 'react';
import './Login.css';
import './Input.css';
import axios from 'axios'; // Para enviar requisições HTTP
import { useNavigate } from 'react-router-dom'; // Para redirecionamento de rotas

const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const navigate = useNavigate(); // Para redirecionamento baseado no tipo de usuário

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, tipo } = response.data;

      localStorage.setItem('token', token); // Armazenar o token no localStorage

      // Redireciona para a tela de acordo com o tipo de usuário
      if (tipo === 'admin') {
        navigate('/admin'); // Redireciona para a tela de Admin
      } else {
        navigate('/usuario'); // Redireciona para a tela de Usuário
      }
    } catch (error) {
      console.error("Erro no login", error);
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-image">
         {/* <img src={'#'} alt="Cadastro" /> */}
      </div>

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
            />
            
            <label>Senha</label>
            <input 
              type="password" 
              name="senha" 
              placeholder="Digite sua senha" 
              value={formData.senha} 
              onChange={handleChange} 
            />
          </div>

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
