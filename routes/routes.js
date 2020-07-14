import express from 'express';
import TransactionController from '../controller/transaction/TransactionController.js';

const transactionRouter = express.Router();

transactionRouter.get('/', TransactionController.findAll);
transactionRouter.post('/', TransactionController.create);
transactionRouter.get('/:id', TransactionController.findOne);
transactionRouter.put('/:id', TransactionController.update);
transactionRouter.delete('/:id', TransactionController.remove);
//app.delete('/grade/', controller.removeAll);

export default transactionRouter;
