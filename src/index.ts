import express, { Request, Response, json } from "express";
import { AppDataSource } from "./data-source";
import { UserController } from "./controllers/UserController";
import { UserDTO } from "./dto/UserDTO";
import { TransactionDTO } from "./dto/TransactionDTO";

const server = express();
server.use(json());

server.get("", (request: Request, response: Response) => {
    return response.send("O servidor está funcionando");
});

// Rota para obter todos os usuários
server.get("/users", async (request: Request, response: Response) => {
    const userController = new UserController();
    return response.json(await userController.getUsers());
});

// Rota para criar um novo usuário
server.post("/users", async (request: Request, response: Response) => {
    const userController = new UserController();
    const newUser = await userController.createUser(new UserDTO(
        null,
        request.body.name,
        request.body.email
    ));
    return response.status(201).json(newUser);
});

// Rota para adicionar dinheiro à transação de um usuário
server.post("/addMoneyToTransaction", async (request: Request, response: Response) => {
    const userController = new UserController();
    return response.json(await userController.addMoneyToTransaction(new TransactionDTO(
        null,
        request.body.currency,
        request.body.amount,
        request.body.userId
    )));
  
});


server.listen(3000, () => {
    AppDataSource.initialize()
        .then(async () => {
            console.log("database initialized");
        })
        .catch((error) => console.log(error));
    console.log("Servidor escutando na porta 3000");
});

