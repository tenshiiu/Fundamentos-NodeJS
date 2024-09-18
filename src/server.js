import http from "node:http";

const server = http.createServer((req, res) => {
    const { method, url } = req

    if(method == 'GET' && url == "/users") {
        //Early Return
        return res.end("Listagem de usuário")

    }

    if(method == "POST" && url == "/users") {
        return res.end("Criação de usuário")
    }
 
    return res.end("Hello World")
})

server.listen(3333)