// Import
const express = require('express')
const _cors = require('cors')
const _dotEnv = require('dotenv')
const app = express()
const middlewares = require('./middlewares/middlewares')
const _database = require('./tools/database')

// Config
_dotEnv.config()
app.use(express.json())
app.use(_cors())
_database.init()

// Route
app.use('/auth', middlewares.init)
app.use('/auth', require('./router/auth'))
app.use('/user', require('./router/user'))
app.use('/statistics', require('./router/statistics'))

app.listen(process.env.PORT || 5000)