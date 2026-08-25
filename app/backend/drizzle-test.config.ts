import 'dotenv/config'
import dotenv from 'dotenv'
import path from 'node:path'
import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: path.resolve('./.env.test') })

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/features/**/schema.ts',
  out: './migrations/test',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: 'migrations-table',
    schema: 'migrations-schema',
  },
})
