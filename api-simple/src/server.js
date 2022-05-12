import http from 'http'

const pid = process.pid

const server = http.createServer((request, response) => {
    for (let index = 0; index < 1e7; index++);

    response.end(`Handled by PID: ${pid}`)
})

server.listen(3000)
.once('listening', () => {
    console.log(`Server started PID ${pid}`)
})

process.on('SIGTERM', () => {
    console.log('Server ending: ', new Date().toISOString())
    server.close(() => process.exit())
})