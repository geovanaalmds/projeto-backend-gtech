const jwt = require('jsonwebtoken');

// Middleware para validar token JWT
function authMiddleware(request, response, next) {
    const authHeader = request.headers['authorization'];

    // Verifica se o header Authorization existe e começa com "Bearer "
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(400).json({ error: 'Token inexistente ou inválido.'});
    }

    // Extrai o token do header
    const token = authHeader.split(' ')[1];

    try {
        // Verifica e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next(); // Segue para a próxima função/middleware
    }catch(error) {
        // Token inválido ou expirado
        return response.status(400).json({ error: 'Token inválido ou expirado.' });
    }
}

module.exports = authMiddleware;