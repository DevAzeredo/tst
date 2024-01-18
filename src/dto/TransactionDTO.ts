// src/dto/TransactionDTO.ts
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";

export class TransactionDTO {
    constructor(
      public id: string,
      public currency: string,
      public amount: number,
      public userId: string
    ) {}
  
    static fromModel(transactionModel: Transaction): TransactionDTO {
      const transactionDTO = new TransactionDTO(
        transactionModel.id,
        transactionModel.currency,
        transactionModel.amount,
        transactionModel.user.id
      );
      return transactionDTO;
    }

    toModel(): Transaction {
      const newTransaction = new Transaction();
      newTransaction.currency = this.currency;
      newTransaction.amount = this.amount;
      newTransaction.user = new User();
      newTransaction.user.id = this.userId;
      return newTransaction;
    }
}
