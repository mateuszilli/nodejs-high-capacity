import os from 'os'
import cluster from 'cluster'

const runPrimaryProcess = () => {
    const cpus = os.cpus().length

    console.log(new Date().toISOString(), `- primary ${process.pid} is running`)
    console.log(new Date().toISOString(), `- forking server with ${cpus} cpus`)

    for (let index = 0; index < cpus; index++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(new Date().toISOString(), `- worker ${worker.process.pid} died... scheduling another one`)
            cluster.fork()
        }
    })
}

const runWorkerProcess = async () => {
    await import('./server.js')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()