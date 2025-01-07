const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log('Token ausente no header.');
      return res.status(401).json({ message: 'Acesso negado!' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Permissão negada!' });
      }

      console.log('Usuário autenticado:', req.user);
      
      next();
    } catch (error) {
      console.error('Erro ao verificar token:', error.message);
      return res.status(401).json({ message: 'Token inválido!' });
    }
  };
};

module.exports = authMiddleware;
