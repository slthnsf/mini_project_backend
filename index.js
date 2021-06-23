const express = require('express')
const app = express()
const PORT = 2021
const cors = require('cors')
const bearerToken = require('express-bearer-token')

app.use(bearerToken())
app.use(cors())
app.use(express.json())

const { db } = require('./config/database')

app.get('/', (req, res) => {
    res.status(200).send(`<h2>JC BANDUNG</h2>`)
})
db.getConnection((err, connection) => {
    if (err) {
        return console.error('Error MySQL', err.message)
    }
    console.log(`Connected to MySQL Server: ${connection.threadId}`)
})

const { userRouter } = require('./router')
const { paketRouter } = require('./router')
app.use('/users', userRouter)
app.use('/packet', paketRouter)

// ERROR HANDLING
app.use((error, req, res, next) => {
    console.log("Handling Error", error)
    res.status(500).send({ status: 'Error Mysql', message: error })
})


app.listen(PORT, () => console.log("Server Running:", PORT))