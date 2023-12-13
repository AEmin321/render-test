/* eslint-disable no-mixed-spaces-and-tabs */
const mongoose = require ('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require ('supertest')
const app = require ('../app')
const api = supertest (app)
const Note = require('../models/note')
const testHelper = require('./test_helper')

beforeEach(async () => {
	await Note.deleteMany({})
	let newNote = new Note(testHelper.initialObjects[0])
	await newNote.save()
	newNote = new Note(testHelper.initialObjects[1])
	await newNote.save()
}, 100000)

test('specific note', async() => {
	const defaultNotes = await testHelper.notesInDatabase()
	const note = defaultNotes[0]
	const result = await api.get(`/api/notes/${note.id}`).expect(200).expect('Content-Type',/application\/json/)
	expect(result.body).toEqual(defaultNotes[0])
}, 10000)

test('note can be deleted', async() => {
	const notesAtStart = await testHelper.notesInDatabase()
	const gonnaDelete = notesAtStart[0]
	await api.delete(`/api/notes/${gonnaDelete.id}`).expect(204)
	const notesAtEnd = await testHelper.notesInDatabase()
	expect(notesAtEnd).toHaveLength(testHelper.initialObjects.length-1)
	const contents = notesAtEnd.map(item => item.content)
	expect(contents).not.toContain(gonnaDelete.content)
}, 10000)

test('testing the content validation', async() => {
	const newObj = {
		important:true
	}
	await api.post('/api/notes').send(newObj).expect(400)
	const notes = await testHelper.notesInDatabase()
	console.log(notes)
	expect(notes).toHaveLength(testHelper.initialObjects.length)
}, 100000)

test('Testing the get with async function', async() => {
	const newObj = {
		content:'newcontent',
		important:true
	}
	await api.post('/api/notes')
		.send(newObj).expect(201).expect('Content-Type', /application\/json/)

	const notes = await testHelper.notesInDatabase()
	const contents = notes.map(item => item.content)
	expect(notes).toHaveLength(testHelper.initialObjects.length+1)
	expect(contents).toContain('newcontent')
}, 100000)

test('there are two notes in test db', async () => {
	const res = await testHelper.notesInDatabase()
	expect(res).toHaveLength(testHelper.initialObjects.length)
}, 10000)

test('first item content is html is easy as fuck...', async () => {
	const res = await testHelper.notesInDatabase()
	expect(res[0].content).toBe('HTML is easy')
}, 10000)

test('notes returned as json',async () => {
	await api.get('/api/notes')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 10000)

afterAll(async () => {
	await mongoose.connection.close()
})