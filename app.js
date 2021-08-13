const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

// constants
const PORT = config.get('port') || 5000

async function start() {
    try {
    //    address connect to Uri
    await mongoose.connect(config.get('mongoUri'), {

    })
    } catch (e) {
        console.log('Server Error', e.message)
        // exit Node.js
        process.exit(1)
    }
}

start();

// customization server
app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

