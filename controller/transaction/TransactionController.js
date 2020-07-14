import logger from '../../config/Logger.js';
import { db } from '../../database/db/db.js';

const findAll = async (req, res) => {
  const yearMonth = req.query.periodo; //
  try {
    const Transaction = db.transaction;
    let transaction;
    if (yearMonth) {
      transaction = await Transaction.find({
        yearMonth: { $regex: new RegExp(yearMonth), $options: 'gi' },
      });
    } else {
      res
        .status(500)
        .send(
          'é necessario informar o parametro "/period" cujo o valor deve estar no formato yyyy-mm'
        );
      logger.info(`GET /api/transaction not foi informado o periodo`);
    }
    if (transaction.length > 0) {
      res.send(transaction);
      logger.info(`GET /api/transaction`);
    } else {
      res.send('Nehuma transacao encontrada');
      logger.info(`GET /api/transaction not localized`);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao listar todos as transaction',
    });
    logger.error(`GET /api/transaction - ${JSON.stringify(error.message)}`);
  }
};

const create = async (req, res) => {
  try {
    const Transaction = db.transaction;
    const transaction = new Transaction({
      description: req.body.description,
      category: req.body.category,
      type: req.body.type,
      value: req.body.value,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      yearMonth: req.body.yearMonth,
      yearMonthDay: req.body.yearMonthDay,
    });
    const data = await transaction.save(transaction);
    res.send(data);
    logger.info(`POST /api/transaction - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /api/transaction - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const Transaction = db.transaction;
    let transaction = await Transaction.find({ _id: id });
    if (transaction.length > 0) {
      res.send(transaction);
      logger.info(`GET /api/transaction - ${id}`);
    } else {
      res.status(500).send({ message: 'Transaction nao encontrada id: ' + id });
      logger.error(`GET /api/transaction - ${JSON.stringify(error.message)}`);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar a transaction id: ' + id });
    logger.error(`GET /api/transaction - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  try {
    const id = req.params.id;
    const Transaction = db.transaction;
    const transaction = await Transaction.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (transaction) {
      res.send({ message: 'Transaction atualizado com sucesso' });
      logger.info(`PUT /api/transaction - ${id} - ${JSON.stringify(req.body)}`);
    } else {
      res.send('Transaction não atualizado!');
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a transaction id: ' + id });
    logger.error(`PUT /api/transaction - ${JSON.stringify(error.message)}`);
  }
};
//
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const Transaction = db.transaction;
    const transaction = await Transaction.findByIdAndRemove({ _id: id });
    if (!transaction) {
      res.send(`transaction id ${id} nao encontrado`);
      logger.info(`DELETE /api/transaction - ${id} não encontrada`);
    } else {
      res.send({ message: 'Transaction excluido com sucesso' });
      logger.info(`DELETE /api/transaction - ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar a trasnasction id: ' + id });
    logger.error(`DELETE /api/transaction - ${JSON.stringify(error.message)}`);
  }
};

/*const removeAll = async (_req, res) => {
  try {
    const Grade = db.grade;
    const deletou = await Grade.deleteMany({});
    if (deletou.deletedCount > 0) {
      logger.info('Deleted All Grades!');
      res.send('Deleted All Grades!');
    } else {
      logger.info('Not Deleted All Grades!');
      res.send('Not Deleted All Grades!');
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};*/

export default { findAll, create, findOne, update, remove }; //, removeAll };
