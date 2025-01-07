import { useState, useEffect } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Recupera o token do localStorage ao carregar o componente
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return { token, setToken };
};

export default useAuth;
