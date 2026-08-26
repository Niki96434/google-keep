import type { Note } from '@shared/notes/types'
import styles from './Note.module.css'
import menuIcon from './../assets/three-dots.png'

type NoteProps = Pick<Note, 'title' | 'content'>

export function Note({ title, content }: NoteProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
      <img src={menuIcon} className={styles.menu} alt="Меню заметки" />
    </div>
  )
}
