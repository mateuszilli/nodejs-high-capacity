import http from 'http'

const server = http.createServer((request, response) => {
    for (let index = 0; index < 1e7; index++);

    console.log(new Date().toISOString(), `- request ended with PID ${process.pid}`)
    response.end()
})

server.listen(3000)
.once('listening', () => {
    console.log(new Date().toISOString(), `- server started with PID ${process.pid}`)
})

process.on('SIGTERM', () => {
    console.log(new Date().toISOString(), `- server ending with PID ${process.pid}`)
    server.close(() => process.exit())
})