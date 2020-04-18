import TransactionsRepository from '../repositories/TransactionsRepository';
import ValidationError from './exception/ValidationError';
import ValidationMessage from './exception/ValidationMessage';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionValidator {
  private transactionsRepository: TransactionsRepository;

  private validationMessage: ValidationMessage;

  constructor(
    transactionsRepository: TransactionsRepository,
    validationMessage: ValidationMessage,
  ) {
    this.transactionsRepository = transactionsRepository;
    this.validationMessage = validationMessage;
  }

  public validate(value: number, type: 'income' | 'outcome'): ValidationError {
    const balance = this.getBalance();

    const validationError = new ValidationError();
    validationError.addError(this.validateIncome(value, type));
    validationError.addError(this.validateOutcome(value, type, balance));
    return validationError;
  }

  private getBalance(): Balance {
    return this.transactionsRepository.getBalance();
  }

  private validateIncome(value: number, type: string): ValidationMessage {
    if (type === 'income') {
      if (value < 0) {
        this.validationMessage = new ValidationMessage(
          'value',
          'Value must positive!',
        );
        return this.validationMessage;
      }
    }

    return new ValidationMessage('', '');
  }

  private validateOutcome(
    value: number,
    type: 'income' | 'outcome',
    balance: Balance,
  ): ValidationMessage {
    if (type === 'outcome') {
      if (value > balance.total) {
        this.validationMessage = new ValidationMessage(
          'value',
          `Impossible to withdrawl, insuficient balance: $${
            balance ? balance.total : 0
          }`,
        );
        return this.validationMessage;
      }
    }
    return new ValidationMessage('', '');
  }
}
export default TransactionValidator;
