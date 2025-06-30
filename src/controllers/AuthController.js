const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/UsersModel');


const AuthController = {
    // Gera token JWT após verificar email e senha
    async generateToken (request, response) {
        const { email, password } = request.body;

        // Verifica se os campos foram preenchidos
        if(!email || !password) {
            return response.status(400).json({ error: 'Por favor, preencha os campos de Email e Senha.'});
        }

        // Busca o usuário pelo email
        const user = await UsersModel.findOne({ where: { email } });

        // Verifica se o usuário existe
        if(!user) {
            return response.status(400).json({ error: 'Usuário incorreto ou inexistente.' });
        }

        // Compara a senha informada com a salva no banco
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return response.status(400).json({ error: 'Senha incorreta.' })
        }

        // Gera o token com ID e email do usuário, expira em 1 hora
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        // Retorna o token
        return response.status(200).json({token});
    }
};

module.exports = AuthController;