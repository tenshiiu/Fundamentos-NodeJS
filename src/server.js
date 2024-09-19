import http from "node:http";
import { json } from "./middlewares/json.js";

// Determina que a variável usuários é um array.
const users = []

const server = http.createServer(async (req, res) => {
    // Mostra os dois fatores que serão usados ao redor do código na parte de requisição, sendo eles o método e o endereço da página.
    const { method, url } = req

    await json(req, res)

    // Se o método for Get, e a Url /users, ele retorna o conteúdo feito externamente.
    if(method == 'GET' && url == "/users") {
        //Early Return
        return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(users))

    }

    // Se for POST, ele retorna o usuário John Doe.
    if(method == "POST" && url == "/users") {
        const { name, email } = body

        users.push({
            id: 1,
            name,
            email,
        })

        // Na resposta, escreve que o código de status da req foi de 201 ( Ocorreu tudo bem ).
        return res.writeHead(201).end()
    }
    // Caso não tiver nenhum método, será uma mensagem de erro.
    return res.writeHead(404).end("Not Found")
})

// Servidor sendo escutado na porta 3333.
server.listen(3333)