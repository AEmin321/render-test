const Note = require('../models/note')

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
	initialObjects,notesInDatabase,nonExistingId
}