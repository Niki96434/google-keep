import { axiosInstance } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/shared/api'
import type { Note } from '@shared/notes/types'

export function useDeleteNoteMutation() {
  return useMutation({
    mutationFn: (noteId: Note['id']): Promise<void> => {
      return axiosInstance.delete(`/api/v1/notes/${noteId}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })
}
