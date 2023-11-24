require('dotenv').config()
const mongoose = require ('mongoose')

mongoose.set('strictQuery',false)
const url=process.env.MONGODB_URL
console.log('Connecting to the url : ',url)

mongoose.connect(url).then(res=>{
    console.log('Connected to the mongoDB .')
}).catch(error=>{
    console.log('Cant connect to the server:',error.message)
})

const noteSchema = mongoose.Schema({
    content : String,
    important : Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note',noteSchema)

