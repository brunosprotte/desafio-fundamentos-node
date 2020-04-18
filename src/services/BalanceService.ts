import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface BalanceDTO {
  transactions: Transaction[];
  balance: Balance;
}

class BalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public getBalance(): BalanceDTO {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();
    const transactionsAndBalance = {
      transactions,
      balance,
    };
    return transactionsAndBalance;
  }
}
export default BalanceService;
