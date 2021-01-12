import express from 'express'
import cluster from 'cluster'
import { cpus } from 'os'
import { hash } from 'bcrypt'

const app = express()
const numCpu = cpus().length

app.get('/', async (req, res, next) => {
    const Password = '1e1055fb1399691f7cb69b0c55a90a09442f5b47c2997a5e4b489f85302d743f71e5'
    const hPassword = await hash(Password, 14)
    res.send({
        status: 'ok',
        password: hPassword
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


