const http = require('http')
const url = require('url')
const { StringDecoder } = require('string_decoder')
const config = require('./config')
const handlers = {
    hello: (data, callback) => callback(200, {message: 'Hello NodeJS!!!'}),
    notFound: (data, callback) => callback(404)
}
const router = {
    hello: handlers.hello
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.path
    const trimmedPath = path.replace(/^\/+|\/+$/, '')
    const queryStringObj = parsedUrl.query
    const method = req.method.toLowerCase()
    const headers = req.headers
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    
    req.on('data', (data) => {
        buffer += decoder.write(data)
    })

    req.on('end', () => {
        buffer += decoder.end()

        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

        const data = {
            trimmedPath,
            queryStringObj,
            method,
            headers,
            payload: buffer
        }
        chosenHandler(data, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200

            payload = typeof(payload) === 'object' ? payload : {}

            const payloadString = JSON.stringify(payload)

            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode)

            res.end(payloadString)
            
            console.log('Returning Response: ', statusCode, payloadString)
        })
    })
})

server.listen(config.port, () => console.log(`Server is running on port: ${config.port} on ${config.envName} mode.`))