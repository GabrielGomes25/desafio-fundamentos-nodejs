import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
   const balance = transactionsRepository.getBalance();

    return response.json({transactions,balance});



  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {

    const { title, value, type } = request.body; // recebe os valores da requisição

    const createTransaction = new CreateTransactionService(transactionsRepository); // inicia o Service e passa a referencia do Repositorio
    const transaction = createTransaction.execute({title,type,value}); //chama o metodo execute da classe create Transaction para da criação da transação;
    
    return response.json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
