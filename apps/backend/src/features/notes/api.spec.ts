import request from 'supertest'
import { app } from '../../app'
import { test_db } from '../../core/db/test_db'
import { sql } from 'drizzle-orm'
import { notesTable } from './schema'

describe('note api', () => {
  beforeAll(async () => {
    await test_db.execute(sql`TRUNCATE TABLE ${notesTable}`)
  })

  it('should return empty array', async () => {
    const response = await request(app).get('/api/v1/notes/')
    expect(response.status).toBe(200)
    expect(response.body.notes).toEqual([])
  })

  it('should create note', async () => {
    const response = await request(app)
      .post('/api/v1/notes/')
      .send({ title: 'Тестовая заметка', content: 'Контент' })

    expect(response.status).toBe(201)
    expect(response.body.note.title).toBe('Тестовая заметка')
  })

  it('should update note', async () => {
    const res = await test_db.execute(sql`SELECT id FROM ${notesTable}`)
    const { id } = res.rows[0]
    const response = await request(app)
      .put(`/api/v1/notes/${id}`)
      .send({ title: 'Обновленная заметка', content: 'Новый контент' })

    expect(response.status).toBe(200)
    expect(response.body.note.title).toBe('Обновленная заметка')
  })

  it('should delete note', async () => {
    const res = await test_db.execute(sql`SELECT id FROM ${notesTable}`)
    const { id } = res.rows[0]

    const response = await request(app).delete(`/api/v1/notes/${id}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Success')
  })
})
