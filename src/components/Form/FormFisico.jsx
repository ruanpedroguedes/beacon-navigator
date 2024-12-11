// FormCadastro.js

import React, { useState } from 'react';
import './FormCadastro.css';
import './Input.css';
import axios from 'axios'; // Para enviar requisições HTTP

const FormCadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(response.data.message); // Exibe a mensagem do servidor após cadastro
    } catch (error) {
      console.error("Erro no cadastro", error);
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-image">
         {/* <img src={'#'} alt="Cadastro" /> */}
      </div>

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
            />

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
            
            <p>A senha deve conter pelo menos 8 caracteres, incluindo um número e uma letra minúscula.</p>
            
            <label>Confirmar Senha</label>
            <input 
              type="password" 
              name="confirmarSenha" 
              placeholder="Confirme sua senha" 
              value={formData.confirmarSenha} 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" className="form-button">
            Cadastrar
          </button>
        </form>

        <div className="form-footer">
          <p><a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default FormCadastro;
