import { useGetNotes } from '../api/useGetNotes'
import { Note } from './Note'
import styles from './NoteList.module.css'

export function NoteList() {
  const { data, status } = useGetNotes()

  if (status === 'error') {
    return <p>Ошибка загрузки</p>
  }

  if (!data) {
    return
  }

  return (
    <div className={styles.container}>
      {data.notes.map((note) => {
        return <Note title={note.title} content={note.content} />
      })}
    </div>
  )
}
