const Note = require('../models/note')
const User = require('../models/user')

const initialObjects = [
	{
		content: 'HTML is easy',
		important: false
	},
	{
		content: 'Browser can execute only JavaScript',
		important: true
	}
]

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
	const note = new Note({ content:'will remove this note.' })
	await note.save()
	await note.deleteOne()
	return note._id.toString()
}

const notesInDatabase = async () => {
	const notes = await Note.find({})
	return notes.map(note => note.toJSON())
}

module.exports = {
	initialObjects,notesInDatabase,nonExistingId,usersInDb
}