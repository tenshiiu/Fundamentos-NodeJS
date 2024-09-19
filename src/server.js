import http from "node:http";

// Determina que a variável usuários é um array.
const users = []

const server = http.createServer(async (req, res) => {
    // Mostra os dois fatores que serão usados ao redor do código na parte de requisição, sendo eles o método e o endereço da página.
    const { method, url } = req

    // Transforma os dados em buffers, podendo ter uma sintaxe mais rígida e eficaz ( é o único type que pode ser lido em servidores ).
    const buffers = []

    // For Await determina que depois de todos os dados da chunk carregarem ele irá mandar o res de volta.
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    // Transformando o objeto mandado pelo Insomnia em JSON, assim podendo lêr ele em diversas outras partes do código.
    const body = JSON.parse(Buffer.concat(buffers).toString())

    console.log(body.name)

    // Se o método for Get, e a Url /users, ele retorna o conteúdo feito externamente.
    if(method == 'GET' && url == "/users") {
        //Early Return
        return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(users))

    }

    // Se for POST, ele retorna o usuário John Doe.
    if(method == "POST" && url == "/users") {
        users.push({
            id: 1,
            name:"John Doe",
            email: "johndoe@example.com"
        })

        // Na resposta, escreve que o código de status da req foi de 201 ( Ocorreu tudo bem ).
        return res.writeHead(201).end()
    }
    // Caso não tiver nenhum método, será uma mensagem de erro.
    return res.writeHead(404).end("Not Found")
})

// Servidor sendo escutado na porta 3333.
server.listen(3333)