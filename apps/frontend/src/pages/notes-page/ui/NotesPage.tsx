import { Input } from '@/shared/ui'
import { useState } from 'react'

function NotesPage() {
  const [isOpenForm, setOpenForm] = useState<boolean>(false)

  return (
    <div>
      {isOpenForm && <Input placeholder="Название" />}
      <Input placeholder="Заметка..." onClick={() => setOpenForm(true)} />
    </div>
  )
}

export { NotesPage }
