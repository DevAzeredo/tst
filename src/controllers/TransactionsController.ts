// src/controller/TransactionController.ts
import { getRepository, Repository } from 'typeorm';
import { Transaction } from '../entity/Transaction';
import { TransactionDTO } from '../dto/TransactionDTO';
import { Request, Response } from 'express';

export class TransactionController {
  private transactionRepository: Repository<Transaction>;

  constructor() {
    this.transactionRepository = getRepository(Transaction);
  }

  async getTransactions(req: Request, res: Response): Promise<void> {
    const transactionsList = await this.transactionRepository.find();
    const transactionsDTOList = transactionsList.map((transaction) => TransactionDTO.fromModel(transaction));
    res.json(transactionsDTOList);
  }

  async createTransaction(req: Request, res: Response): Promise<void> {
    const { userId, currency, amount } = req.body;

    const transaction = this.transactionRepository.create({
      currency,
      amount,
      user: { id: userId },
    });

    await this.transactionRepository.save(transaction);

    const transactionDTO = TransactionDTO.fromModel(transaction);
    res.status(201).json(transactionDTO);
  }
}
