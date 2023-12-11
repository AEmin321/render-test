/* eslint-disable no-mixed-spaces-and-tabs */
const mongoose = require ('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require ('supertest')
const app = require ('../app')
const api = supertest (app)
const Note = require('../models/note')

const initialize =[
	{
	  content: 'HTML is easy',
	  important: false,
	},
	{
	  content: 'Browser can execute only JavaScript',
	  important: true,
	},
]

beforeEach(async () => {
	await Note.deleteMany({})
	let newNote = new Note(initialize[0])
	await newNote.save()
	newNote = new Note(initialize[1])
	await newNote.save()
}, 100000)

test('testing the content validation', async() => {
	const newObj = {
		important:true
	}
	await api.post('/api/notes').send(newObj).expect(400)
	const notes = await api.get('/api/notes')
	expect(notes.body).toHaveLength(initialize.length)
}, 100000)

test('Testing the get with async function', async() => {
	const newObj = {
		content:'newcontent',
		important:true
	}
	await api.post('/api/notes')
		.send(newObj).expect(201).expect('Content-Type', /application\/json/)

	const notes = await api.get('/api/notes')
	const contents = notes.body.map(item => item.content)
	expect(notes.body).toHaveLength(initialize.length+1)
	expect(contents).toContain('newcontent')
}, 100000)

test('there are two notes in test db', async () => {
	const res = await api.get('/api/notes')
	expect(res.body).toHaveLength(2)
}, 100000)

test('first item content is html is easy as fuck...', async () => {
	const res = await api.get('/api/notes')
	expect(res.body[0].content).toBe('HTML is easy')
}, 100000)

test('notes returned as json',async () => {
	await api.get('/api/notes')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000)

afterAll(async () => {
	await mongoose.connection.close()
})