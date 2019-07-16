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

        // Choose the handler this request shold go to. If one is not defined go to 'Not Found' handler.
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObj,
            method,
            headers,
            payload: buffer
        }

        // Route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
            // Use status code called back from the handler or default 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200

            // Use payload called back from the handler or default empty object {}
            payload = typeof(payload) === 'object' ? payload : {}

            // Convert the payload to string and send as response
            const payloadString = JSON.stringify(payload)

            res.writeHead(statusCode)

            // Send the response
            res.end(payloadString)

            // Log the response
            console.log('Returning Response: ', statusCode, payloadString)
        })
    })
})

// Start the Server, listen on Port 3000
server.listen( 3000, () => console.log('Server is listening on Port: 3000') )


// Define Handlers
const handlers = {}

/**Sample Handler */
handlers.sample = (data, callback) => {
    // Callback a status code and the payload object response
    callback(406, {name: 'sample handler'})

}

/**Not Found */
handlers.notFound = (data, callback) => {
    callback(404)
}

// Define a request router
const router = {
    sample: handlers.sample
}