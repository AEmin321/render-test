const express = require ('express')
const cors = require ('cors')
require('dotenv').config()
const Note = require ('./models/note')
const app = express()

const unknownEndPoint = (req,res) =>{
  res.status(404).send({error:'This end point doesnt exist.'})
}

const errorHandler =(error,req,res,next)=>{
  console.error(error.message)
  if (error.name==='CastError'){
    return res.status(400).send({error:'malformatted id.'})
  }
  next(error)
}

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let notes = [
    {
      id: 1,
      content: "front ennnnnnnnnnnd baaaaaby",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  const randomID = () =>{
    return Math.floor (Math.random()*100)+1
  }

  app.post ('/api/notes',(req,res)=>{
    const data = req.body
    if (data.content===undefined){
      return res.status(400).json({error:'Content is missing sir.'})
    }
    const note = new Note({
      content: data.content,
      important: data.important||false
    })
    note.save().then(response=>{
      res.json(response)
    })
  })

  app.get('/api/notes/:id',(req,res,next)=>{
    Note.findById(req.params.id).then(response=>{
      if (response){
        res.json(response)
      }else {
        res.status(404).end()
      }
    }).catch(error=>next(error))
  })

  app.delete ('/api/notes/:id',(req,res)=>{
    const id=Number(req.params.id)
    note=notes.filter(item=>item.id!==id)
    res.status(204).end()
  })

  app.get ('/api/notes',(req,res)=>{
    Note.find({}).then(response=>{
      res.json(response)
    })
  })

  app.use (errorHandler)
  app.use (unknownEndPoint)

  const PORT = process.env.PORT||3002
  app.listen(PORT,()=>{
    console.log(`Server is running in the port ${PORT}`)
  })

