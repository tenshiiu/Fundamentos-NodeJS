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

const server = http.createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // return req
    // .pipe(new InverseNumberStream())
    // .pipe(res)
})

server.listen(3334)