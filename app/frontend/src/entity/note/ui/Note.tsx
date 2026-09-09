import type { Note } from '@shared/notes/types'
import styles from './Note.module.css'
import menuIcon from './../assets/three-dots.png'
import { PencilIcon, TrashIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/menu/dropdown-menu'
import { useDeleteNoteMutation } from '../api/useDeleteNoteMutation'

type NoteProps = Pick<Note, 'id' | 'title' | 'content'>

export function Note({ id, title, content }: NoteProps) {
  const mutation = useDeleteNoteMutation()

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className={styles.wrapper}>
              <img src={menuIcon} className={styles.menu} alt="Меню заметки" />
            </button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PencilIcon />
              Редактировать
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => mutation.mutate(id)}
              disabled={mutation.isPending}
            >
              <TrashIcon />
              {mutation.isPending ? 'Удаление...' : 'Удалить'}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
