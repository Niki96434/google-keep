import { useGetNotes } from '../api/useGetNotes'
import { Note } from './Note'
import styles from './NoteList.module.css'

export function NoteList() {
  const { data, status } = useGetNotes()

  if (status === 'error' || !data) {
    return <p>Ошибка загрузки</p>
  }

  return (
    <div className={styles.container}>
      {data.notes.map((note) => {
        return <Note key={note.id} title={note.title} content={note.content} />
      })}
    </div>
  )
}
