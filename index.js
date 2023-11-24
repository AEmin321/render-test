const express = require ('express')
const cors = require ('cors')
require('dotenv').config()
const Note = require ('./models/note')
const app = express()
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
  })

  app.get ('/api/notes/:id',(req,res)=>{
    const id=Number(req.params.id)
    const note=notes.find(item=>item.id===id)
    if (note){
        res.json(note)
    }else {
        res.status(404).end()
    }
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

  const PORT = process.env.PORT||3002
  app.listen(PORT,()=>{
    console.log(`Server is running in the port ${PORT}`)
  })

