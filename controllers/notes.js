const notesRouter = require ('express').Router()
const Note = require ('../models/note')

notesRouter.post ('/',async(req,res) => {
	const data = req.body
	const note = new Note({
		content: data.content,
		important: data.important||false
	})
	const savedNote = await note.save()
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
	const notes=await Note.find({})
	res.json(notes)
})

module.exports = notesRouter