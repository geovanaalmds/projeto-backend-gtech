const UserModel = require('../models/UsersModel');

class UsersController {

    async getUserById(request, response) {
        try {
            const{ id } = request.params;
            const user = await UserModel.findByPk(id, {
                attributes: [
                    'id',
                    'firstname',
                    'surname',
                    'email'
                ]
            });
            if(!user) {
                return response.status(404).json({error: "Usuário não encontrado."})
            }

            return response.status(200).json({
                id: user.id,
                firstname: user.firstname,
                surname: user.surname,
                email: user.email
            });
        }catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    }

    async create(request, response) {
       try {
            const { firstname, surname, email, password, confirmPassword} = request.body;

            if(!firstname || !surname || !email || !password || !confirmPassword) {
                return response.status(400).json({ error: "Por favor, preencha todos os campos."});
            }

            if (!email.includes('@')) {
                return response.status(400).json({ error: "E-mail inválido"});
            }

            if (password !== confirmPassword) {
                return response.status(400).json({ error: "As senhas precisam ser iguais"});
            }

            const newUser = await UserModel.create({
                firstname,
                surname,
                email,
                password
            });

            return response.status(201).json({
                id: newUser.id,
                firstname: newUser.firstname,
                surname: newUser.surname,
                email: newUser.email,
                message: "Usuário cadastrado com sucesso!"
            })
       }catch (error) {
        console.error("Erro ao criar usuário:", error);
    }
}

    async update(request, response) {
        try {
            const { id } = request.params;
            const { firstname, surname, email } = request.body;

            if(!firstname || !surname || !email ) {
                return response.status(400).json({ error: "Por favor, preencha todos os campos."});
            }

            if (!email.includes('@')) {
                return response.status(400).json({ error: "E-mail inválido"});
            }

            const user = await UserModel.findByPk(id);
            if(!user) {
                return response.status(404).json({ error: "Usuário não encontrado"});
            }

            await user.update({ firstname, surname, email });

            return response.status(204).send();
        
        }catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;
            const user = await UserModel.findByPk(id);

            if(!user) {
                return response.status(404).json({ error: "Usuário não encontrado."});
            }

            await user.destroy();
            return response.status(204).send();

        }catch(error) {
            console.error("Erro ao deletar usuário:", error);
        }
    }
}

module.exports = UsersController;