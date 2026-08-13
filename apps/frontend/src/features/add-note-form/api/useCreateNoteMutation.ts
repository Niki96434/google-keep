import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/shared/api'
import type { NoteCreateIn, NoteCreateOut } from '../../../../../packages/shared/notes/types'

export function useCreateNoteMutation() {
  const mutation = useMutation({
    mutationFn: async ({ title, content }: NoteCreateIn) => {
      const res = await axiosInstance.post<NoteCreateOut>('/api/v1/notes', { title, content })
      return res.data
    },
  })

  return mutation
}
