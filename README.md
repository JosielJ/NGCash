
### Projeto para o processo seletivo de desenvolvedor Frontend Júnior na ng.cash.

### Tópicos:

- [Descrição do projeto.](#descrição-do-projeto)

- [Funcionalidades.](#funcionalidades)

- [Ferramentas utilizadas.](#ferramentas-utilizadas)

- [Como executar.](#como-executar)

## Descrição do projeto

<p align="justify">
Uma plicação web fullstack rodando em docker, no aplicativo é possível criar um usuário, realizar transferência entre usuários e realizar um depósito.

O Projeto roda um servidor em Node.js responsável por realizar a comunicação entre o front-end feito em React.js com o banco de dados Postgresql.


Diagrama do banco de dados

<img height="200cm" src="https://cdn.discordapp.com/attachments/987790937474351104/1048705790917218364/digram.png" alt="diagrama">

</p>

## Funcionalidades

:heavy_check_mark: `Funcionalidade 1:` Criar um usuario e registrar no banco de dados.

:heavy_check_mark: `Funcionalidade 2:` Fazer transferências entre usuários e registrar essa transferência no banco de dados.

:heavy_check_mark: `Funcionalidade 3:` Ver histórico de transferências.

:heavy_check_mark: `Funcionalidade 4:` Fazer deposito.

:heavy_check_mark: `Funcionalidade 5:` Verificar dados antes de registrar no banco de dados.

:heavy_check_mark: `Funcionalidade 6:` Proteger rotas sensíveis do servidor.

## Ferramentas utilizadas

<div>

  <h3>FrontEnd</h3>
<p>O FrontEnd é feito em React.js com TypeScript. <br>
Conta com bibliotecas e frameworks React como: <br> 
- React routerdom para possibilitar a utilização de rotas no FrontEnd. <br>
- Axios para fazer a comunicação com a API no BackEnd. <br>
- React Hook Form para gerenciar formulários. <br>
- Yup para fazer a validação dos formulários. <br>
- Framer-motion para fazer animações. <br>
- React Three.js, React Three/drei e React Three/fiber para renderizar elementos 3d. <br>
</p>
<br>

  <h3>BackEnd</h3>
<p>O BackEnd é feito em Node.js com TypeScript. <br>
Conta com bibliotecas e frameworks Node como: <br> 
- Prisma como ORM para mapear o banco de dados. <br>
- Express para gerenciar o servidor e rotas. <br>
- Express async errors para lidar com erros assíncronos. <br>
- Cors para gerenciar e permitir requisições do FrontEnd para o BackEnd. <br>
- Bcryptjs para encriptar dados ao enviar para o banco de dados. <br>
- Jsonwebtoken gerenciar tokens e verificar a requisições vindas do FrontEnd. <br>
</p>
<br>

  <h3>Banco de Dados</h3>
<p>PostgreSQL para gerenciar de banco de dados.</p>
<br>

  <h3>DevOps</h3>
<p>Docker e Docker Compose para criar os contêineres do FrontEnd, BackEnd e Bancos de Dados.</p>

<div/>

  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"/>

###

## Como executar

<p>Para executar o aplicativo você precisa ter instalado em sua máquina o Docker Desktop</p>

```bash
Criar o containers no Docker
  $ docker-compose up --build -d 
```
