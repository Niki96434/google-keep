import { NoteForm } from '@/features/add-note-form/ui/NoteForm'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div className={styles.container}>
      <NoteForm />
    </div>
  )
}
