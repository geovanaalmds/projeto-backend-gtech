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


Setup do ambiente de desenvolvimento:

1. Clone o repositório:
    git clone https://github.com/geovanaalmds/projeto-backend-gtech

2. Instale as dependências:
    npm install

3. Crie um arquivo .env na raiz do projeto e adicione:
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=root
    DB_NAME=drip_store
    JWT_SECRET=senha1234
    DB_DIALECT=mysql

4. Crie o banco de dados.

5. Inicie o servidor com:
    npm run dev


 Documentação da API

    Autenticação:
        POST /v1/user/token
        Gera um token JWT.

        Body:

        {
        "email": "user@mail.com",
        "password": "123@123"
        }

        Resposta:

        {
        "token": "<JWT>"
        }


Usuários

    POST /v1/user
        Cria um novo usuário (Público).

    GET /v1/user/:id
        Busca usuário por ID (Público).

    POST /v1/user/token
        Gera token JWT (Público).

    PUT /v1/user/:id
        Atualiza um usuário (Requer token).

    DELETE /v1/user/:id
        Remove um usuário (Requer token).


Produtos

    GET /v1/product/search 
         Busca lista de produtos com filtros (Público).

    GET /v1/product/:id 
         Busca produto por ID (Público).

    POST /v1/product 
         Cria novo produto (Requer token).

    PUT /v1/product/:id 
         Atualizar produto (Requer token).

    DELETE /v1/product/:id 
         Remover produto (Requer token).

Categorias

    GET /v1/category/search
     Lista categorias (Público).

    GET /v1/category/:id 
     Busca categoria por ID (Público).

    POST /v1/category 
     Cria nova categoria (Requer token).

    PUT /v1/category/:id 
     Atualizar categoria (Requer token).

    DELETE /v1/category/:id 
     Remover categoria (Requer token).


Guia de Uso

    1. Crie um usuário com POST /v1/user;
    2. Gere um token com POST /v1/user/token;
    3. Use o token nas requisições protegidas;
    4.Teste os endpoints com ferramentas como Insomnia ou Postman.

    
Colaboradores:

- Geovana Almeida da Silva: Aplicação Back-end inicial; Banco de dados; Modelo de Usuários e Categorias; Controller de Usuários e Categorias; Rotas;
- Mariana Santos Oliveira: Controller de Produtos;
- Kayo Erysson da Silva Alves: Autenticação JWT;