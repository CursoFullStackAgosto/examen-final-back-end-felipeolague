const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  // 1. Obtener el header Authorization
  const authHeader = req.headers['authorization'];

  // 2. Extraer el token (esperado formato: "Bearer <token>")
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // 3. Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // 4. Adjuntar el payload (ej. userId) al request
    req.user = payload;
    next();
  });
}

module.exports = autenticarToken;
