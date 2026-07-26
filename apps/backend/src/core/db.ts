import dotenv from 'dotenv'
import path from 'path'
import { Pool } from 'pg'

dotenv.config({ path: path.resolve(process.cwd(), './../../.env') })

export const pool = new Pool({
  user: process.env.PGUSER,
  port: Number(process.env.PGPORT) || 5432,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
})

pool.on('error', (_err: Error) => {
  process.exit(1)
})
