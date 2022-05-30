// import
const _express = require('express')
const _cors = require('cors')
const _dotEnv = require('dotenv')

const _app = _express()

//config
_dotEnv.config()
_app.use(_express.json())
_app.use(_cors())


// Route
_app.use('/login', require('./router/login'))
_app.use('/user', require('./router/user'))
_app.use('/statistics', require('./router/statistics'))

_app.listen(process.env.PORT)