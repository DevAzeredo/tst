import { getRepository, Repository } from 'typeorm';
import { AppDataSource } from "../data-source";
import { User } from '../entity/User';
import { Transaction } from '../entity/Transaction';
import { TransactionDTO } from '../dto/TransactionDTO';
import { UserDTO } from '../dto/UserDTO';
import { Request, Response } from 'express';

export class UserController {
    userRepository: Repository<User> = AppDataSource.getRepository(User);
    transactionRepository: Repository<Transaction> = AppDataSource.getRepository(Transaction);

    constructor() { }

    async getUsers() {
        const usersList = await this.userRepository.find();
        return usersList.map((user) => UserDTO.fromModel(user));
    }

    async createUser(userDTO: UserDTO) {
        const userRepository = AppDataSource.getRepository(User);
        const newUser = userDTO.toModel();
        const savedUser = await userRepository.save(newUser);

        return UserDTO.fromModel(savedUser)
    }

    async addMoneyToTransaction(transactionDTO: TransactionDTO) {
        const transaction = transactionDTO.toModel();
        const user = await this.userRepository.findOne({
            where: {
                id: transaction.user.id
            }
        });
        if (user) {
            const newTransaction = this.transactionRepository.create({
                currency: transaction.currency,
                amount: transaction.amount,
                user: user,
            });

            await this.transactionRepository.save(newTransaction);
            return transactionDTO = TransactionDTO.fromModel(newTransaction);
        } else {
            return { error: 'User not found' }

        }
    }
}
