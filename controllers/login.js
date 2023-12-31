const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


loginRouter.post('/', async(request,response) => {
	const { username,password } = request.body
	const user = await User.findOne({ username })
	console.log(user)
	const isPaswordCorrect = user===null ? false : await bcrypt.compare(password,user.passwordHash)

	if (!(user && isPaswordCorrect)){
		return response.status(401).json({ error:'Username or password is not valid.' })
	}

	const userForToken = {
		username: user.username,
		id: user._id
	}
	const token = jwt.sign(userForToken, process.env.SECRET,{ expiresIn:60*60 })

	response.status(200).send({ token,username:user.username,name:user.name })
})


module.exports = loginRouter