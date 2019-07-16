// Dependencies - All ready available on Node
const http = require('http')

// Create a server that will reponse all requests with "Hello World"
const server = http.createServer((req, res) => {
    res.end('Hello World!')
})

// Start the Server, listen on Port 3000
server.listen(3000, () => console.log('Server is listening on Port: 3000') )