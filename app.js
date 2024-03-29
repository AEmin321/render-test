const config = require ('./utils/config')
const cors = require ('cors')
const express = require ('express')
require('express-async-errors')
const app = express()
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const middleware = require ('./utils/middleware')
const mongoose = require ('mongoose')
const logger = require ('./utils/logger')

mongoose.set('strictQuery',false)
logger.info('Connecting to the url : ',config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL).then(() => {
	logger.info('Connected to the mongoDB.')
}).catch(error => {
	logger.info('Cant connect to the server:',error.message)
})

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.use('/api/notes',notesRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}
app.use (middleware.errorHandler)
app.use (middleware.unknownEndPoint)

module.exports = app