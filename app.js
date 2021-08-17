const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

// parsing req.body (для исключения ошибки в режиме undefined)
app.use(express.json({extended: true}))

// register ROUTE (connecting middleware)
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))

// constants
const PORT = config.get('port') || 5000

async function start() {
    try {
        //    address connect to Uri
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        // exit Node.js
        process.exit(1)
    }
}

start();


