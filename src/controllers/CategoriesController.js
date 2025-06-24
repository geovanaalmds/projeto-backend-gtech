const CategoryModel = require('../models/CategoriesModel');

class CategoriesController {
    async search(request, response) {
        try {
            let {
                limit = 12,
                page =1,
                fields,
                use_in_menu
            } = request.query;

            limit = parseInt(limit);
            page = parseInt(page);

            if(isNaN(limit) || isNaN(page) || limit===0 || page < 1) {
                return response.status(400).json({ error: 'Parâmetros inválidos.' });
            }

            const where = {};
            if (use_in_menu === 'true') {
                where.use_in_menu = true;
            }

            const options = {
                where,
                attributes: ['id', 'name', 'slug', 'use_in_menu']
            };

            if(fields) {
                options.attributes = fields.split(',').map(field => field.trim());
            }

            if(limit !== -1) {
                options.limit = limit;
                options.offset = (page -1) * limit;
            }

            const { rows, count } = await CategoryModel.findAndCountAll(options);

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
            if(!category) {
                return response.status(404).json({error: "Categoria não encontrada."})
            }

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

    async create(request, response) {
        try {
            const { name, slug, use_in_menu} = request.body;

            if(!name || !slug || !use_in_menu) {
                return response.status(400).json({ error: "Por favor, preencha todos os campos."});
            }

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
            })
        }catch (error) {
            console.error("Erro ao criar categoria:", error);
        }
    }

    async update(request, response) {
        try{
            const { id } = request.params;
            const { name, slug, use_in_menu } = request.body;

            if(!name || !slug || !use_in_menu) {
                return response.status(400).json({ error: "Por favor, preencha todos os campos."});
            }

            const category = await CategoryModel.findByPk(id);
            if(!category) {
                return response.status(404).json({ error: "Categoria não encontrada."});
            }

            await category.update({ name, slug, use_in_menu });

            return response.status(204).send();
        }catch(error) {
            console.error('Erro ao atualizar a categoria:', error);
        }
    }
    
    async delete(request, response) {
        try {
            const { id } = request.params;
            const category = await CategoryModel.findByPk(id);

            if(!category) {
                return response.status(404).json({ error: "Categoria não encontrada."});
            }

            await category.destroy();
            return response.status(204).send();

        }catch(error) {
            console.error("Erro ao deletar categoria.")
        }
    }
}

module.exports = CategoriesController;