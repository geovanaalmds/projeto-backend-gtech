const { Sequelize, ProductsModel, ProductImageModel, 
  ProductOptionsModel, ProductandCategoryModel, CategoriesModel } = require('../models');
const CategoryModel = require('../models/CategoriesModel');


class ProductsController {
     // Busca produtos com filtros, paginação e inclui imagens, opções e categorias
    async search(request, response) {
        try {
          let {
            limit=12,
            page = 1,
            fields,
            match,
            category_ids,
            price_range,
            option
          } = request.query;

          limit = parseInt(limit);
          page = parseInt(page);
          
          // Valida parâmetros básicos
          if(isNaN(limit) || isNaN(page) || limit === 0 || page < 1) {
            return response.status(400).json({ error: 'Parâmetros inválidos.'});
          }

          const where = {};

          // Filtro por texto em nome ou descrição
          if(match) {
            where[Sequelize.Op.or] = [
              { name: { [Sequelize.Op.like]: `%${match}%` } },
              { description: { [Sequelize.Op.like]: `%${match}%` } }
            ];
          }

          // Filtro por faixa de preço
          if(price_range) {
            const [min, max] = price_range.split('-').map(Number);
            where.price = { [Sequelize.Op.between]: [min, max] };
          }

          const optionsObj = {
            where,
            distinct: true,
            attributes: ['id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount'],
            include: [
             {
              model: ProductandCategoryModel,
              as: 'product_category_links',
              attributes: ['category_id']
             },
             {
              model: ProductImageModel,
              as: 'images',
              attributes: ['id', 'path']
             },
             {
              model: ProductOptionsModel,
              as: 'options',
              attributes: ['id', 'title', 'shape', 'radius', 'type', 'values']
             }
            ]
          };

          // Filtra por categorias, se informado
          if(category_ids) {
            const categoryArray = category_ids.split(',').map(id => parseInt(id));
            optionsObj.include[0].where = {
              category_id: {
                [Sequelize.Op.in]: categoryArray
              }
            };
          }

          // Permite selecionar campos específicos
          if (fields) {
            optionsObj.attributes = fields.split(',').map(field => field.trim());
          }

          // Permite selecionar campos específicos
          if (limit !== -1) {
            optionsObj.limit = limit;
            optionsObj.offset = (page - 1) * limit;
          }

          // Executa consulta com contagem total
          const { rows, count } = await ProductsModel.findAndCountAll(optionsObj);

          // Formata resultado para retornar IDs de categorias e URLs das imagens
          const result = rows.map(product => {
            const json = product.toJSON();

            json.category_ids = json.product_category_links.map(link => link.category_id);
            delete json.product_category_links;
            
            if(json.images) {
              json.images = json.images.map(image => ({
                id: image.id,
                content: image.path.startsWith('http')
                  ? image.path
                  : `https://store.com/media/${image.path}`
              }));
            }

            if(json.options) {
              json.options = json.options.map(opt => ({
                id: opt.id,
                title: opt.title,
                shape: opt.shape,
                radius: opt.radius,
                type: opt.type,
                values: opt.values ? opt.values.split(',') : []
              }));
            }
            return json;
          });

          // Formata resultado para retornar IDs de categorias e URLs das imagens
          return response.status(200).json({
            data: result,
            total: count,
            limit,
            page
          });
        }catch(error) {
          console.error('Erro ao buscar produtos:', error);
        }
    }

    // Busca um produto pelo ID, inclui imagens, opções e categorias
    async getProductById(request, response) {
        try{
          const{ id } = request.params;
          const product = await ProductsModel.findByPk(id, {
            attributes: [
              'id',
              'enabled',
              'name',
              'slug',
              'stock',
              'description',
              'price',
              'price_with_discount',
            ],
            include: [
              {
                model: ProductImageModel,
                as: 'images',
                attributes: ['id', 'path']
              },
              {
                model: ProductOptionsModel,
                as: 'options',
                attributes: ['id', 'title', 'shape', 'radius', 'type', 'values']
              },
              {
                model: ProductandCategoryModel,
                as: 'product_category_links',
                attributes: ['category_id']
              }
            ]
          });

          //Verifica se o produto existe
          if(!product) { 
            return response.status(404).json({ error: 'Produto não encontrado.' });
          }

          const json = product.toJSON();

          // Extrai só os IDs das categorias vinculadas para facilitar o consumo da API
          json.category_ids = json.product_category_links.map(link => link.category_id);
          delete json.product_category_links;

          // Retorna os dados do produto com as categorias formatada
          return response.status(200).json(json);
        }catch(error) {
          console.error('Erro ao buscar produto:', error);
          return response.status(400).json({ error: 'Erro ao buscar produto.' });
        }
    }

    // Cria um novo produto com imagens e opções associadas
    async create(request, response) {
        try {
          const {
            enabled, 
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount,
            category_ids,
            images,
            options
          } = request.body;

          // Validação básica dos campos obrigatórios
          if(!name || !slug || !price || !Array.isArray(category_ids)) {
            return response.status(400).json({ error: 'Dados obrigatórios estão ausentes ou inválidos.' });
          }

          // Cria o produto
          const newProduct = await ProductsModel.create({
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount,
            category_ids
          });

          // Cria as imagens, armazenando em base64 com mime-type
          if(Array.isArray(images)) {
            for (const image of images) {
              await ProductImageModel.create({
                product_id: newProduct.id,
                path: `data:${image.type};base64,${image.content}`
              });
            }
          }

          // Cria as opções do produto, formatando valores como string separada por vírgulas
          if(Array.isArray(options)) {
            for (const option of options) {
              await ProductOptionsModel.create({
                product_id: newProduct.id,
                title: option.title,
                shape: option.shape || 'square',
                radius: parseInt(option.radius) || 0,
                type: option.type || 'text',
                values: Array.isArray(option.values || option.value)
                ? (option.values || option.value).join(',')
                : ''
              });
            }
          }
          
          return response.status(201).json({ message: 'Produto criado com sucesso!' });
        }catch(error) {
          console.error('Erro ao criar produto:', error);
          return response.status(400).json( { error: 'Erro ao criar produto.'});
        }
    }

    // Atualiza um produto pelo ID
    async update(request, response) {
        try{
          const { id } = request.params;
          const {
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount,
            category_ids
          } = request.body;

          const product = await ProductsModel.findByPk(id);

          if(!product) {
            return response.status(404).json({ error: 'Produto não encontrado.'});
          }

          await product.update({
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount,
            category_ids
          });

          return response.status(200).json({ message: 'Produto atualizado com sucesso.'});
        }catch(error) {
          console.error('Erro ao atualizar produto:', error);
          return response.status(400).json({ error: 'Erro ao atualizar produto:'})
        }
    }

    // Atualiza um produto pelo ID
    async delete(request, response) {
        try{
          const{ id } = request.params;
          const product = await ProductsModel.findByPk(id);

          //Verifica se o produto existe
          if(!product) {
            return response.status(404).json({ error: 'Produto não encontrado.'});
          }

          // Remove o produto
          await product.destroy();
          
          //Retorna 204 sem conteúdo
          return response.status(204).send();
        }catch(error) {
          console.error("Erro ao deletar categoria.");
        }
    }
}

module.exports = ProductsController;