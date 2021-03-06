// Import
const express = require('express')
const cors = require('cors')
const app = express()
const middlewares = require('./middlewares/middlewares')
const database = require('./tools/database')

// Config
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: true
}))
app.options('*', cors());
database.init()

// Route
app.use('*', middlewares.init)
app.use('/auth', require('./router/auth'))
app.use('/docs', require('./router/docs'))
app.use('/statistics', require('./router/statistics'))
app.use('/user', middlewares.valid.field.token, middlewares.verifyAccessToken, require('./router/user'))


app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running.');
})