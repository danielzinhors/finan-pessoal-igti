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
        .send('requisicao incorreta pois não foi informado o periodo');
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

/*const create = async (req, res) => {
  try {
    const Grade = db.grade;
    const grade = new Grade({
      name: req.body.name,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
    });
    const data = await grade.save(grade);
    res.send(data);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const name = req.query.name;
  const id = req.params.id;
  try {
    const Grade = db.grade;
    let grade;
    if (id) {
      grade = await Grade.find({ _id: id });
    } else {
      grade = await Grade.find({
        name: { $regex: new RegExp(name), $options: 'gi' },
      });
    }
    res.send(grade);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
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
    const Grade = db.grade;
    const data = await Grade.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (data) {
      res.send({ message: 'Grade atualizado com sucesso' });
      logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    } else {
      res.send('Grade não atualizado com sucesso');
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};
//
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const Grade = db.grade;
    const data = await Grade.findByIdAndRemove({ _id: id });
    if (!data) {
      res.send(`Grade id ${id} nao encontrado`);
    } else {
      res.send({ message: 'Grade excluido com sucesso' });
      logger.info(`DELETE /grade - ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (_req, res) => {
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

export default { findAll }; //, create, findOne, update, remove, removeAll };
