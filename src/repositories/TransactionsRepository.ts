import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';
import transactionRouter from '../routes/transaction.routes';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface CreateTransactionBalanceDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance | undefined;

  constructor() {
    this.transactions = [];
  }

  public all(): CreateTransactionBalanceDTO {
    return { transactions: this.transactions, balance: this.getBalance() };
  }

  public getBalance(): Balance {
    if (!this.transactions.length) {
      return { income: 0, outcome: 0, total: 0 };
    }
    const income = this.transactions
      .filter(trans => trans.type === 'income')
      .map(transaction => transaction.value)
      .reduce((prev, cur) => prev + cur, 0);

    const outcome = this.transactions
      .filter(trans => trans.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce((prev, cur) => prev + cur, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
