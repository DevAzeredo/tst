import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Transaction } from "./entity/Transaction"
import { CreateEntityTransaciton1705534823856 } from "./migration/1705534823856-CreateEntityTransaciton"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "carteira",
    synchronize: true,
    logging: false,
    entities: [User, Transaction],
    migrations: [CreateEntityTransaciton1705534823856],
    migrationsTableName: "migrations",
    subscribers: [],
})
