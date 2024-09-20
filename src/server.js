import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
    // Mostra os dois fatores que serão usados ao redor do código na parte de requisição, sendo eles o método e o endereço da página.
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })  
    
    if (route) {
        const routeParams = req.url.match(route.path)

        return route.handler(req, res)
    }

    // Caso não tiver nenhum método, será uma mensagem de erro.
    return res.writeHead(404).end("Not Found")
})

// Servidor sendo escutado na porta 3333.
server.listen(3333)