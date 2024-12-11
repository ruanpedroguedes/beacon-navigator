import React, { useState } from 'react';
import './Login.css';
import './Input.css';
import logo from '../../assets/cadastro.png';  // Se não for usar a imagem, pode remover essa linha.

const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione a lógica para enviar os dados do formulário
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
          <div className='input-group'>
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
