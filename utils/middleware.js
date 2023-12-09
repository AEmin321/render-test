const logger = require ('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndPoint = (req,res) => {
	res.status(404).send({ error:'This end point doesnt exist.' })
}

const errorHandler =(error,req,res,next) => {
	logger.error(error.message)
	if (error.name==='CastError'){
		return res.status(400).send({ error:'malformatted id.' })
	}
	else if (error.name==='ValidationError'){
		return res.status(400).json({ error:error.message })
	}
	next(error)
}

module.exports = {
	errorHandler,unknownEndPoint,requestLogger
}