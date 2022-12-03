
### Projeto para o processo seletivo de desenvolvedor Frontend Júnior na ng.cash.

### Tópicos:

- [Descrição do projeto.](#descrição-do-projeto)

- [Funcionalidades.](#funcionalidades)

- [Ferramentas utilizadas.](#ferramentas-utilizadas)

- [Acesso ao projeto.](#acesso-ao-projeto)

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
O FrontEnd conta com bibliotecas e frameworks React como: <br> 
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
O BackEnd conta com bibliotecas e frameworks Node como: <br> 
- Prisma como ORM para mapear o banco de dados. <br>
- Express para gerencias o servidor e rotas. <br>
- Express async errors para lidar com erros assincronos. <br>
- Cors para gerenciar e permitir requisiçoes do FrontEnd para o BackEnd. <br>
- Bcryptjs para encriptar dados ao enviar para o servidor. <br>
- Jsonwebtoken gerenciar tokens e veriricar a requisiçoes vindas do FrontEnd. <br>
</p>

<div/>

  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"/>

###

## Acesso ao projeto

Você pode [ver o código-fonte do projeto](https://github.com/JosielJ/Treino-React-Three.js) ou [acessar o projeto](https://treino-react-three-js.vercel.app/).
