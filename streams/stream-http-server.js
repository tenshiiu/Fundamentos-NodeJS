import http from "node:http";
import { Transform } from "node:stream"

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback) {
               // Pedaço, como vai ser codificado, e resultado

        const transformed = Number(chunk.toString()) * -1

         console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
        //callback("se ocorrer um erro", "resultado")
    }
}

const server = http.createServer((req, res) => {
    return req
    .pipe(new InverseNumberStream())
    .pipe(res)
})

server.listen(3334)