import { useState, useEffect } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // Adiciona a recuperação do usuário
    setToken(storedToken);
    setUser(storedUser);
  }, []);

  return { token, user, setToken, setUser };
};

export default useAuth;