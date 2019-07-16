// Dependencies - All ready available on Node
const http = require('http')
const url = require('url') // Module provides utilities for URL resolution and parsing (https://nodejs.org/api/url.html)
const { StringDecoder } = require('string_decoder') // Module provides an API for decoding Buffer objects into strings (https://nodejs.org/api/string_decoder.html)

// Create a server that will reponse all requests with "Hello World"
const server = http.createServer((req, res) => {
    
    // Get request url and parse it.
    const parsedUrl = url.parse(req.url, true)

    // Get the path
    const path = parsedUrl.path
    const trimmedPath = path.replace(/^\/+|\/+$/, '')

    // Get request HTTP Method
    const method = req.method.toLowerCase()

    // Get Query String as object
    const queryStringObj = parsedUrl.query

    // Get request Headers
    const headers = req.headers

    // Get Payload if there is any
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    req.on('data', (data) => {
        buffer += decoder.write(data)
    })

    req.on('end', () => {
        buffer += decoder.end()

        // Send the response
        res.end('Hello World!')

        // Log the request path
        console.log(`Request Path: ${trimmedPath} using Method: ${method}`)
        console.log('Passed query string that was converted to the object: ', queryStringObj)
        console.log('Request Headers: ', headers)
        console.log('The payload was: ', buffer)
    })
})

// Start the Server, listen on Port 3000
server.listen( 3000, () => console.log('Server is listening on Port: 3000') )