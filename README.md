Projeto Back-end

Descrição:

Este projeto é um back-end para uma loja online, desenvolvido em Node.js, que oferece uma API REST para gerenciar usuários, produtos e categorias. O sistema permite operações de criação, leitura, atualização e exclusão (CRUD) nessas entidades, com segurança aplicada via autenticação JWT para proteger rotas sensíveis. O objetivo é fornecer uma base robusta e escalável para um e-commerce.


Tecnologias Utilizadas:

- Node.js
- Express.js
- Dotenv
- Nodemon
- MySQL
- Sequelize
- JWT
- JEST
- Bcrypt


Estrutura do Projeto:

- Rotas: endpoints para usuários, produtos e categorias.
- Controllers: lógica de negócio para cada entidade (usuários, produtos, categorias).
- Models: definição das entidades e seus relacionamentos no banco, incluindo submodelos relacionados a produtos como        ProductOptions, ProductImages e ProductsAndCategories.
- Middleware de Autenticação: aplicado nas rotas POST, PUT e DELETE para usuários, produtos e categorias, exceto para a criação de usuários (POST /user), que é aberta para permitir o cadastro.


Autenticação e Segurança:

A autenticação é feita via token JWT, que limita o acesso às rotas de modificação (POST, PUT, DELETE). O uso do bcrypt garante a segurança no armazenamento das senhas dos usuários, fazendo o hash antes de salvar no banco.


Colaboradores:

- Geovana Almeida da Silva: Aplicação Back-end inicial; Banco de dados; Modelo de Usuários e Categorias; Controller de Usuários e Categorias; Rotas;
- Mariana Santos Oliveira: Controller de Produtos;
- Kayo Erysson da Silva Alves: Autenticação JWT;