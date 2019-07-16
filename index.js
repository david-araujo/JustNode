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

    // Send the response
    res.end('Hello World!')

    // Log the request path
    console.log(trimmedPath)
})

// Start the Server, listen on Port 3000
server.listen( 3000, () => console.log('Server is listening on Port: 3000') )