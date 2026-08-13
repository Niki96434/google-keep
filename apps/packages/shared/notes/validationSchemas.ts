import * as z from 'zod'

export const NoteCreateInSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    error: 'At least one field must be specified: title or content',
  })

export const NotePartialUpdateInSchema = NoteCreateInSchema

export const NoteUpdateInSchema = z.object({
  title: z.string(),
  content: z.string(),
})

export const NoteIdSchema = z.object({
  id: z.string(),
})
