import express from 'express'
import cluster from 'cluster'
import { cpus } from 'os'
import { heavyTask } from './heavyTask'

const app = express()

const numCpu = cpus().length

app.get('/', (req, res, next) => {
    heavyTask()  //some heavy task
    res.send({
        status: 'ok',
        process_id: process.pid
    })
})

const PORT = process.env.PORT || 4000

if (cluster.isMaster) {
    for (let i = 0; i < numCpu; i++)
        cluster.fork();
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid} died`)
        cluster.fork();
    })
}
else {
    app.listen(PORT, () => { console.log(`👷🏽‍♀️ ${process.pid} running  on ${PORT}`) })
}


