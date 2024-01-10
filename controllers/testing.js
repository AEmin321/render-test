const testingRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')


testingRouter.post('/reset', async(request,response) => {
	await Note.deleteMany({})
	await User.deleteMany({})

	response.status(204).end()
})

module.exports = testingRouter