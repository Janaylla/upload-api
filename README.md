# upload-api

## 💻 Sobre o projeto
Backend de y=uma aplicação que faz uploads de arquivos

## Projeto diponivel em:

<a href="https://uploaded-api.herokuapp.com">
https://uploaded-api.herokuapp.com
</a>

## ⚙️ Funcionalidades

- SignUp
- Login
- Pegar informações de aruivos enviados
- Enviar arquivos

## Como executar o projeto localmente

```bash
git clone https://github.com/Janaylla/upload-api.git
```
Crie um aruivo .env e preencha as informações de um banco mysql:

```env
DB_HOST = 
DB_NAME = 
DB_USER =  
DB_PASSWORD =  
// JWT_KEY é uma chave aleatória fica a seu criterio
JWT_KEY =  
```
No terminal novamente:
```bash
npm install
npm run migration
npm run start 
```
## 🛠 Tecnologias

 (NodeJS + TypeScript)
  - Express
  - CORS
  - KnexJS
  - mysql
  - ts-node
  - dotENV
  - Multer
  - jsonwebtoken
  - uuid
  - bcryptjs
