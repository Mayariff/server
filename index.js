const express = require('express')
const PORT = process.env.PORT || 8081
const testRouter = require('./routs/test.routes')


const app = express()
app.use(express.json())

app.use('/api', testRouter)

app.listen(PORT, () => {
    console.log(`server works on port ${PORT}`)
})