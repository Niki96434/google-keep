import request from 'supertest'
import { app } from '../../app'
import { test_db } from '../../core/db/test_db'
import { sql } from 'drizzle-orm'
import { notesTable } from './schema'
import { randomUUID } from 'node:crypto'

describe('get notes', () => {
  beforeEach(async () => {
    await test_db.execute(sql`TRUNCATE TABLE ${notesTable}`)
  })

  it('should return empty array', async () => {
    const response = await request(app).get('/api/v1/notes/')
    expect(response.status).toBe(200)
    expect(response.body.notes).toEqual([])
  })
})

describe('create note', () => {
  it('should create note', async () => {
    const response = await request(app)
      .post('/api/v1/notes/')
      .send({ title: 'Тестовая заметка', content: 'Контент' })

    expect(response.status).toBe(201)
    expect(response.body.note.title).toBe('Тестовая заметка')
  })

  it('should return status code 400 if title and content are empty', async () => {
    const response = await request(app).post('/api/v1/notes/').send({ title: null, content: null })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Validation error')
  })
})

describe('update note', () => {
  it('should return updated note', async () => {
    await request(app)
      .post('/api/v1/notes/')
      .send({ title: 'Тестовое заметище', content: 'Контентище' })

    const res = await test_db.execute(
      sql`SELECT id FROM ${notesTable} WHERE title = 'Тестовое заметище'`
    )
    const { id } = res.rows[0]

    const response = await request(app)
      .put(`/api/v1/notes/${id}`)
      .send({ title: 'Обновленная заметка', content: 'Новый контент' })

    expect(response.status).toBe(200)
    expect(response.body.note.title).toBe('Обновленная заметка')
  })

  it('should return status code 400 if note id is not exist', async () => {
    const id = randomUUID()

    await expect(
      request(app)
        .put(`/api/v1/notes/${id}`)
        .send({ title: 'Обновленная заметка', content: 'Новый контент' })
    ).resolves.toHaveProperty('status', 400)
  })
})

describe('delete note', () => {
  it('should delete note', async () => {
    await request(app)
      .post('/api/v1/notes/')
      .send({ title: 'Тестовая заметка для удаления', content: 'Контент' })

    const res = await test_db.execute(
      sql`SELECT id FROM ${notesTable} WHERE title = 'Тестовая заметка для удаления'`
    )
    const { id } = res.rows[0]

    const response = await request(app).delete(`/api/v1/notes/${id}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Success')
  })
})
