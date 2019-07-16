// Dependencies - All ready available on Node
const http = require('http')
const url = require('url') // Module to work easily with urls, making parsings an other cool stuffs.

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

    // Send the response
    res.end('Hello World!')

    // Log the request path
    console.log(`Request Path: ${trimmedPath} using Method: ${method}`)
    console.log('Passed query string that was converted to the object: ', queryStringObj)
    console.log('Request Headers: ', headers)
})

// Start the Server, listen on Port 3000
server.listen( 3000, () => console.log('Server is listening on Port: 3000') )