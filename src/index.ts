import express from 'express'

const app = express()

app.get('/', (req, res, next) => {
    res.send({ status: 'ok' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => { console.log(`✌🏽 running on ${PORT}`) })