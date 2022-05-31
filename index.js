// Import
const _express = require('express')
const _cors = require('cors')
const _dotEnv = require('dotenv')
const _app = _express()
const _middlewares = require('./middlewares/middlewares')
const _database = require('./tools/database')

// Config
_dotEnv.config()
_app.use(_express.json())
_app.use(_cors())
_database.init()

// Route
_app.use('/auth', _middlewares.init)
_app.use('/auth', require('./router/auth'))
_app.use('/user', require('./router/user'))
_app.use('/statistics', require('./router/statistics'))

_app.listen(process.env.PORT || 3000)