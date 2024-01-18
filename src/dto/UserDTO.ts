// src/dto/UserDTO.ts
import { Transaction } from '../entity/Transaction';
import { User } from '../entity/User';

export class UserDTO {
  constructor(public id: string, public name: string, public transactions: Transaction[]) {}

  static fromModel(userModel: User): UserDTO {
    const userDTO = new UserDTO(userModel.id, userModel.name, userModel.transactions);
    return userDTO;
  }

  toModel(): User {
    const newUser = new User();
    newUser.name = this.name;
    newUser.transactions = this.transactions;
    return newUser;
  }
}
