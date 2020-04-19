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

    let errors = '';

    if (type === 'income') {
      errors = this.transactionValidator.validateIncome(value, type);
    } else if (type === 'outcome') {
      errors = this.transactionValidator.validateOutcome(value, type);
    }

    if (errors.length) {
      throw Error(errors);
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
