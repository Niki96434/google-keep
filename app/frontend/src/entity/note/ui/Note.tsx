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

type NoteProps = Pick<Note, 'title' | 'content'>

export function Note({ title, content }: NoteProps) {
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
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
