import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const notesTable = pgTable('notes', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuidv7()`),
  user_id: uuid()
    .default(sql`uuidv7()`)
    .notNull(),
  title: text().default('').notNull(),
  content: text().default('').notNull(),
})
