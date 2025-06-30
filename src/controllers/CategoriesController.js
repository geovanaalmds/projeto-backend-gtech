const CategoryModel = require('../models/CategoriesModel');

class CategoriesController {
    // Busca categorias com paginação, filtro e seleção de campos
    async search(request, response) {
        try {
            let {
                limit = 12,
                page = 1,
                fields,
                use_in_menu
            } = request.query;

            limit = parseInt(limit);
            page = parseInt(page);

            // Valida parâmetros básicos
            if(isNaN(limit) || isNaN(page) || limit===0 || page < 1) {
                return response.status(400).json({ error: 'Parâmetros inválidos.' });
            }

            const where = {};

            // Filtro opcional para categorias que aparecem no menu
            if (use_in_menu === 'true') {
                where.use_in_menu = true;
            }

            const options = {
                where,
                attributes: ['id', 'name', 'slug', 'use_in_menu']
            };

            // Permite selecionar campos específicos
            if(fields) {
                options.attributes = fields.split(',').map(field => field.trim());
            }

            // Permite selecionar campos específicos
            if(limit !== -1) {
                options.limit = limit;
                options.offset = (page -1) * limit;
            }

            // Executa consulta com contagem total
            const { rows, count } = await CategoryModel.findAndCountAll(options);

            // Retorna categorias com total, limite e página
            return response.status(200).json({
                data: rows,
                total: count,
                limit,
                page
            });
        }catch(error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }

    // Busca uma categoria pelo ID
    async getCategoryById(request, response) {
        try{
            const{ id } = request.params;
            const category = await CategoryModel.findByPk(id, {
                attributes: [
                    'id',
                    'name',
                    'slug',
                    'use_in_menu'
                ]
            });
            
            //Verifica se existe a categoria
            if(!category) {
                return response.status(404).json({error: "Categoria não encontrada."})
            }

            // Retorna dados da categoria encontrada
            return response.status(200).json({
                id: category.id,
                name: category.name,
                slug: category.slug,
                use_in_menu: category.use_in_menu
            });
        }catch(error) {
            console.error('Erro ao buscar categoria:', error);
        }
    }

    // Cria nova categoria
    async create(request, response) {
        try {
            const { name, slug, use_in_menu} = request.body;

            // Valida campos obrigatórios
            if(!name || !slug || !use_in_menu) {
                return response.status(400).json({ error: "Por favor, preencha todos os campos."});
            }

            //Cria uma nova categoria
            const newCategory = await CategoryModel.create({
                name,
                slug,
                use_in_menu
            });

            return response.status(201).json({
                name: newCategory.name,
                slug: newCategory.slug,
                use_in_menu: newCategory.use_in_menu,
                message: "Categoria cadastrada com sucesso!"
            });
        }catch (error) {
            console.error("Erro ao criar categoria:", error);
        }
    }

    // Atualiza categoria
    async update(request, response) {
        try{
            const { id } = request.params;
            const { name, slug, use_in_menu } = request.body;

            // Valida campos obrigatórios
            if(!name || !slug || !use_in_menu) {
                return response.status(400).json({ error: "Por favor, preencha todos os campos."});
            }

            const category = await CategoryModel.findByPk(id);

            // Verifica se a categoria existe
            if(!category) {
                return response.status(404).json({ error: "Categoria não encontrada."});
            }

            // Atualiza a categoria
            await category.update({ name, slug, use_in_menu });

            // Retorna 204 sem conteúdo
            return response.status(204).send();
        }catch(error) {
            console.error('Erro ao atualizar a categoria:', error);
        }
    }
    
    // Deleta categoria
    async delete(request, response) {
        try {
            const { id } = request.params;
            const category = await CategoryModel.findByPk(id);

            // Verifica se a categoria existe
            if(!category) {
                return response.status(404).json({ error: "Categoria não encontrada."});
            }

            //Remove a categoria
            await category.destroy();

            //Retorna 204 sem conteúdo
            return response.status(204).send();

        }catch(error) {
            console.error("Erro ao deletar categoria:", error);
        }
    }
}

module.exports = CategoriesController;