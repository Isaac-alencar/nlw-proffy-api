<h1 align="center">
    <img alt="Proffy" src=".github/logo.svg" height="100px" />
    <!-- <br>API Proffy<br/> -->
      <br>| Node.js |<br />
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Isaac-alencar/nlw-proffy-api?style=flat-square">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Isaac-alencar/nlw-proffy-api?style=flat-square">
  <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%237519C1?style=flat-square"><br/>
</p>
<p align="center">
  <a href="#Sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-executar">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## Sobre

O **Proffy** é uma aplicação Web e Mobile feita para auxiliar na conexão entre os alunos e os professores. Logo, esta aplicação oferece aos professores a possibilidade de registrar aulas, podendo adicionar informações como a disciplina, o custo e horário e aos alunos a possibilidade de buscar pelas aulas cadastradas.

Este projeto foi idealizado pensando no **6 de agosto**, onde se comemora o **Dia Nacional dos Profissionais da Educação**.

Essa aplicação foi realizada durante a Next **Level Week #2**, projeto da [Rocketseat](https://rocketseat.com.br/).

## Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Knex](http://knexjs.org/)
- [Jest](https://jestjs.io/)

## Get started

#### Requesitos

Tenha-os instalado previamente em sua máquina.

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [NPM](https://www.npmjs.com/) (padrão do Node) ou [Yarn](https://yarnpkg.com/).

Para clonar o repositório:

```sh
  $ git clone https://github.com/Isaac-alencar/nlw-proffy-api.git
```

## Como executar

2. Executando a Aplicação:

```sh
  # mude para o diretório da  api
  $ cd nlw-proffy-api
  # Instalando as dependências do projeto.
  $ yarn # ou npm install

  # Crie antes o banco de dados e então faça o comando abaixo no termial
  #para criar as tabelas.
  $ yarn knex:migrate # ou npm run knex:migrate

  # Inicie a API com o servidor de desenvolvimento
  $ yarn dev # ou npm dev
```

## Testes, Testes e mais testes

A proposta original do projeto não previa a utilização de testes, mas como  
boa prática, sempre devemos pensar em testes na aplicação. Os testes são a  
garantia que seu software não vai quebrar a cada nova feature implementada  
ou a cada refatoração de que você tentar realizar.

E, como o próprio projeto sofrerá mudanças e novas implementações, nada melhor  
que utilizar testes para garantir que tudo está funcionando com deveria.
