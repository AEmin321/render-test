const notesRouter = require ('express').Router()
const Note = require ('../models/note')
const User = require('../models/user')


notesRouter.post ('/',async(req,res) => {
	const data = req.body
	const user = await User.findById(data.userId)
	const note = new Note({
		content: data.content,
		important: data.important||false,
		user:user.id
	})
	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote._id)
	await user.save()
	res.status(201).json(savedNote)
})

notesRouter.get('/:id',async(req,res) => {
	const findItem = await Note.findById(req.params.id)
	if (findItem){
		res.json(findItem)
	}else {
		res.status(404).end()
	}
})

notesRouter.put ('/:id',async(req,res) => {
	const data = req.body
	const updatedObject = {
		content:data.content,
		important:data.important
	}
	const update = await Note.findByIdAndUpdate(req.params.id,updatedObject,{ new : true })
	res.json(update)
})

notesRouter.delete ('/:id',async(req,res) => {
	await Note.findByIdAndDelete(req.params.id)
	res.status(204).end()
})

notesRouter.get ('/',async(req,res) => {
	const notes=await Note.find({}).populate('user',{ username:1,name:1 })
	res.json(notes)
})

module.exports = notesRouter