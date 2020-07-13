import express from 'express';
import TransactionController from '../controller/transaction/TransactionController.js';

const transactionRouter = express.Router();

transactionRouter.get('/', TransactionController.findAll);
//app.post('/', controller.create);
//app.get('/:id', controller.findOne);
//app.put('/:id', controller.update);
//app.delete('/:id', controller.remove);
//app.delete('/grade/', controller.removeAll);

export default transactionRouter;
