import TransactionsRepository from '../repositories/TransactionsRepository';
import ValidationError from './exception/ValidationError';
import ValidationMessage from './exception/ValidationMessage';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
/**
 * Lots of commented lines beacuse I've broken the Skylab(rockeseat) tests
 * They don't use the project tests, so I have to use they're pattern ;)
 */
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

  /*
    public validate(value: number, type: 'income' | 'outcome'): ValidationError {
      const balance = this.getBalance();

      const validationError = new ValidationError();
      validationError.addError(this.validateIncome(value, type));
      validationError.addError(this.validateOutcome(value, type, balance));
      return validationError;
    }
  */

  public getBalance(): Balance {
    return this.transactionsRepository.getBalance();
  }

  public validateIncome(value: number, type: string): string {
    // if (type === 'income') {
    if (value < 0) {
      this.validationMessage = new ValidationMessage(
        'value',
        'Value must positive!',
      );
      // return this.validationMessage;
      return 'Value must positive!';
      // }
    }

    return '';
  }

  public validateOutcome(value: number, type: 'income' | 'outcome'): string {
    const balance = this.getBalance();
    let validation = '';

    // if (type === 'outcome') {
    if (value > balance.total) {
      this.validationMessage = new ValidationMessage(
        'value',
        `Impossible to withdrawl, insuficient balance: $${
          balance ? balance.total : 0
        }`,
      );
      validation = `Impossible to withdrawl, insuficient balance: $${
        balance ? balance.total : 0
      }`;
    }
    // }
    return validation;
  }
}
export default TransactionValidator;
