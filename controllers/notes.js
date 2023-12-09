const notesRouter = require ('express').Router()
const Note = require ('../models/note')

notesRouter.post ('/',(req,res,next) => {
	const data = req.body
	const note = new Note({
		content: data.content,
		important: data.important||false
	})
	note.save().then(response => {
		res.json(response)
	}).catch(error => next(error))
})

notesRouter.get('/:id',(req,res,next) => {
	Note.findById(req.params.id).then(response => {
		if (response){
			res.json(response)
		}else {
			res.status(404).end()
		}
	}).catch(error => next(error))
})

notesRouter.put ('/:id',(req,res,next) => {
	const data = req.body
	const updatedObject = {
		content:data.content,
		important:data.important
	}
	Note.findByIdAndUpdate(req.params.id,updatedObject,{ new : true }).then(response => {
		res.json(response)
	}).catch(error => next(error))
})

notesRouter.delete ('/:id',(req,res,next) => {
	Note.findByIdAndDelete(req.params.id).then(() => {
		res.status(204).end()
	}).catch(error => next(error))
})

notesRouter.get ('/',(req,res) => {
	Note.find({}).then(response => {
		res.json(response)
	})
})

module.exports = notesRouter