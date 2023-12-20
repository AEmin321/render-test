const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/',async(request,response) => {
	const { username,name,password } = request.body
	const saltRounds = 10

	const hashPassword = await bcrypt.hash(password,saltRounds)

	const user = new User({ username,name,hashPassword })
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = usersRouter