import Transaction from '../models/Transaction';

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

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeBalance = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') {
        return transaction.value + sum;
      }
      return sum;
    }, 0);
    const outcomeBalance = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') {
        return transaction.value + sum;
      }
      return sum;
    }, 0);
    const totalBalance = incomeBalance - outcomeBalance;
    const balance = {
      income: incomeBalance,
      outcome: outcomeBalance,
      total: totalBalance,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
