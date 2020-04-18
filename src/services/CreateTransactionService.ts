import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import TransactionValidator from '../validator/TransactionValidator';
import ValidationMessage from '../validator/exception/ValidationMessage';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  private transactionValidator: TransactionValidator;

  private validationMessage: ValidationMessage;

  constructor(
    transactionsRepository: TransactionsRepository,
    transactionValidator: TransactionValidator,
    validationMessage: ValidationMessage,
  ) {
    this.transactionsRepository = transactionsRepository;
    this.transactionValidator = transactionValidator;
    this.validationMessage = validationMessage;
  }

  public execute({ title, value, type }: Request): Transaction {
    this.transactionValidator = new TransactionValidator(
      this.transactionsRepository,
      this.validationMessage,
    );

    const errors = this.transactionValidator.validate(value, type);
    if (errors.errors.length) {
      throw errors;
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
