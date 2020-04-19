import { Router } from 'express';

import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';
import ValidationMessage from '../validator/exception/ValidationMessage';
import TransactionValidator from '../validator/TransactionValidator';

import BalanceService from '../services/BalanceService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const validationMessage = new ValidationMessage('', '');
const transactionValidator = new TransactionValidator(
  transactionsRepository,
  validationMessage,
);

transactionRouter.get('/', (request, response) => {
  try {
    const balanceService = new BalanceService(transactionsRepository);
    const balance = balanceService.getBalance();
    return response.json(balance);
  } catch (err) {
    console.log(err);
    console.log(err.message);
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
      transactionValidator,
      validationMessage,
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
