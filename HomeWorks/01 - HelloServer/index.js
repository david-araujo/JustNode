const http = require('http')
const url = require('url')
const config = require('./config')

const server = http.createServer((req, res) => {

})

server.listen(config.port, () => console.log(`Server is running on port: ${config.port} on ${config.envName} mode.`))