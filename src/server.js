// Importação de módulos necessários
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");

// Configuração do dotenv para variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333; // Usar a variável de ambiente PORT, se definida

// Configurações globais de middleware
app.use(cors()); // Permitir requisições CORS
app.use(express.json()); // Aceitar requisições com corpo em JSON

// Rotas da aplicação
app.use("/api", routes); // Prefixo '/api' para as rotas

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack); // Log do erro no console
  res.status(err.status || 500).json({ message: err.message }); // Resposta de erro com status adequado
});

// Iniciação do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando no http://localhost:${PORT}`);
});
