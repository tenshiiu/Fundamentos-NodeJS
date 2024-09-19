export async function json(req, res) {
    // Transforma os dados em buffers, podendo ter uma sintaxe mais rígida e eficaz ( é o único type que pode ser lido em servidores ).
    const buffers = []

    // For Await determina que depois de todos os dados da chunk carregarem ele irá mandar o res de volta.
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        // Transformando o objeto mandado pelo Insomnia em JSON, assim podendo lêr ele em diversas outras partes do código.
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    res.setHeader("Content-type", "application/json")
}