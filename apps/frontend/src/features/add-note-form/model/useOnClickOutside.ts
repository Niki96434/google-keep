import { useEffect, type RefObject } from 'react'
import type { UseFormGetValues } from 'react-hook-form'
import { NoteCreateInSchema } from './../../../../../../packages/shared/notes/validationSchemas'
import * as z from 'zod'
import { useCreateNoteMutation } from '../api/useCreateNoteMutation'

interface OnClickOutside<T extends HTMLElement = HTMLElement> {
  formRef: RefObject<T | null>
  handler: () => void
  getValues: UseFormGetValues<z.infer<typeof NoteCreateInSchema>>
}

type EventType = MouseEvent | TouchEvent

export function useOnClickOutside({ formRef, handler, getValues }: OnClickOutside) {
  const mutation = useCreateNoteMutation()
  useEffect(() => {
    const listener = (event: EventType) => {
      if (!formRef.current || formRef.current.contains(event.target as Node)) {
        return
      }
      alert('нажали на все кроме формы')
      const values = getValues()
      mutation.mutate({ title: values?.title || '', content: values?.content || '' })

      handler()
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [formRef, handler, getValues, mutation])
}
