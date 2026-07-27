import type { Request, Response } from 'express'
import { app } from '../../app'

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('hello')
})
