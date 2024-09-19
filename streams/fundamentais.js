// process.stdin
//     .pipe(process.stdout)

// Isso aqui embaixo é uma stream! Pois formatam os dados antes mesmo de serem totalmente finalizados

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
    index = 1
    
    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, enconding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback) {
               // Pedaço, como vai ser codificado, e resultado

        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
        //callback("se ocorrer um erro", "resultado")
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())