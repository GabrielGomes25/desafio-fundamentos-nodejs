import Transaction from '../models/Transaction';


interface CreateTransactionDTO{
  title:string;
  value:number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}


class TransactionsRepository {
  private transactions: Transaction[]; // cria um array de transactions para amarzenar as transaction

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    
    const {income,outcome} = this.transactions.reduce((accumulator:Balance, transaction: Transaction)=>{

      switch(transaction.type){
        case "income":
          accumulator.income += transaction.value;
          break;
        case "outcome":
          accumulator.outcome += transaction.value;
          break;
        default:
          break;
      }
      return accumulator;

    },{
      income:0,
      outcome:0,
      total: 0,
    })

    const total = income - outcome;
    return {income,outcome,total};
  }

  public create({title,type,value}:CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title,type,value});

    this.transactions.push(transaction); // insera a nova transaction no array de transactions


    return transaction;
  }
}

export default TransactionsRepository;
