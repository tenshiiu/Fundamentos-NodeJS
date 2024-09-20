import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";
import { Database } from "./middlewares/database.js";

// Determina que a variável usuários é um array.
const database = new Database()



const server = http.createServer(async (req, res) => {
    // Mostra os dois fatores que serão usados ao redor do código na parte de requisição, sendo eles o método e o endereço da página.
    const { method, url } = req

    await json(req, res)

    // Se o método for Get, e a Url /users, ele retorna o conteúdo feito externamente.
    if(method == 'GET' && url == "/users") {
        const users = database.select("users")

        //Early Return
        return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(users))

    }

    // Se for POST, ele retorna o usuário John Doe.
    if(method == "POST" && url == "/users") {
        const { name, email } = body;

        const user = ({
            id: randomUUID(),
            name,
            email,
        })

        database.insert("users", user)

        // Na resposta, escreve que o código de status da req foi de 201 ( Ocorreu tudo bem ).
        return res.writeHead(201).end()
    }
    // Caso não tiver nenhum método, será uma mensagem de erro.
    return res.writeHead(404).end("Not Found")
})

// Servidor sendo escutado na porta 3333.
server.listen(3333)