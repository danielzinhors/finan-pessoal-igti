import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import path from 'path';
import dotenv from 'dotenv';
import logger from './config/Logger.js';
import { db } from './database/db/db.js';
import bodyParser from 'body-parser';
//Faz a leitura do arquivo ".env" por padrão
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Vinculando o React ao app
//let __dirname;
//app.use(express.static(path.join(__dirname, 'client/build')));
//Rota raiz
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});
//Rotas principais do app
app.use('/api/transaction', routes);
//Conexão ao Banco de Dados
let connectedToMongoDB;
logger.info('Iniciando conexão ao MongoDB...');
(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado ao banco de dados');
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);
    connectedToMongoDB = false;
    process.exit();
  }
})();

db.mongoose.connection.once('open', () => {
  connectedToMongoDB = true;
  logger.info('Conectado ao MongoDB');
  //Definição de porta e inicialização do app
  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    logger.info(`Servidor iniciado na porta ${APP_PORT}`);
  });
});
