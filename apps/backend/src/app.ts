import express from 'express'
import { notesRouter } from './features/notes/router'
import { globalErrorHandler } from './core/globalErrorHandler'

export const app = express()

app.use(express.json())

app.use('/api/v1/notes', notesRouter)

app.use(globalErrorHandler)
