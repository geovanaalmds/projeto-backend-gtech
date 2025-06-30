const UserModel = require('../models/UsersModel');

class UsersController {

    // Buscar usuário pelo ID (retorna dados básicos)
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
            if(!user) { //Verifica se o usuário existe
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

    // Cria novo usuário com validações básicas
    async create(request, response) {
       try {
            const { firstname, surname, email, password, confirmPassword} = request.body;

            // Verifica se todos os campos foram preenchidos
            if(!firstname || !surname || !email || !password || !confirmPassword) {
                return response.status(400).json({ error: "Por favor, preencha todos os campos."});
            }

            // Validação simples de email
            if (!email.includes('@')) {
                return response.status(400).json({ error: "E-mail inválido"});
            }

            // Confirma se as senhas conferem
            if (password !== confirmPassword) {
                return response.status(400).json({ error: "As senhas precisam ser iguais"});
            }

            // Cria o usuário no banco
            const newUser = await UserModel.create({
                firstname,
                surname,
                email,
                password
            });

            // Retorna dados do novo usuário (sem senha) e mensagem de sucesso
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

    // Atualiza dados do usuário
    async update(request, response) {
        try {
            const { id } = request.params;
            const { firstname, surname, email } = request.body;

            // Verifica os campos obrigatórios
            if(!firstname || !surname || !email ) {
                return response.status(400).json({ error: "Por favor, preencha todos os campos."});
            }

            // Validação simples de email
            if (!email.includes('@')) {
                return response.status(400).json({ error: "E-mail inválido"});
            }

            // Busca o usuário no banco
            const user = await UserModel.findByPk(id);
            if(!user) {
                return response.status(404).json({ error: "Usuário não encontrado"});
            }

            // Atualiza os dados
            await user.update({ firstname, surname, email });

            // Retorna 204 sem conteúdo
            return response.status(204).send();
        
        }catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        }
    }

    // Deleta o usuário
    async delete(request, response) {
        try {
            const { id } = request.params;
            const user = await UserModel.findByPk(id);

            if(!user) { //Verifica se o usuário existe
                return response.status(404).json({ error: "Usuário não encontrado."});
            }

            // Remove o usuário
            await user.destroy();

            // Retorna 204 sem conteúdo
            return response.status(204).send();

        }catch(error) {
            console.error("Erro ao deletar usuário:", error);
        }
    }
}

module.exports = UsersController;