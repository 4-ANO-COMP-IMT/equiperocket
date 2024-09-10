# SpotSoftware

## Descrição do Projeto

O SpotSoftware é um sistema que oferece dois aplicativos principais: um para verificar a lotação de restaurantes em tempo real e outro para gerenciar mesas e recursos de restaurantes. 

O objetivo é proporcionar uma experiência eficiente tanto para clientes quanto para gerentes de restaurantes, facilitando o controle de ocupação e melhorando a organização interna.

## Membros da Equipe

- **Vinicius Urias da Cruz** - RA: 20.00601-2
- **Lucas Miguel de Matos Negri** - RA: 19.00386-2
- **Matheus Igino Machado** - RA: 20.01629-8
- **Larissa Navarro Pizarro** - RA: 19.02028-7

## Pré-requisitos

Antes de iniciar o projeto, é necessário instalar o RabbitMQ. Siga as instruções no link abaixo para realizar a instalação:

- [Instalar RabbitMQ](https://www.rabbitmq.com/)

Além disso, garanta que você tenha o Node.js e o NPM instalados em seu ambiente.

## Passo a Passo para Execução

### 1. Clone o Repositório

Abra o terminal e execute o seguinte comando para clonar o repositório do projeto:

```bash
git clone <link do repo>
```
### 2. Inicie o RabbitMQ

Certifique-se de que os serviços do RabbitMQ estão ativos antes de executar o projeto. Para mais detalhes sobre como iniciar o RabbitMQ, consulte a documentação oficial.

### 3. Execução do Back-end

Acesse a pasta do back-end:
```bash
cd ./equiperocket/back
```
Dentro dessa pasta, acesse cada um dos serviços individualmente:

authUser: 
```bash
cd ./authuser
```
fillter: 
```bash
cd ./fillter
```
profile: 
```bash
cd ./profile
```
signUp: 
```bash
cd ./signup 
```
inicie-os com o comando:
```bash
npm run start
```
### 4. Execução do Front-end
Acesse a pasta do front-end:
```bash
cd ./equiperocket/front
```
Em seguida, inicie o front-end com o comando:
```bash
npm run start
```



