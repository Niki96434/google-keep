import { Input } from '@/shared/ui'
import { useRef, useState } from 'react'
import { useOnClickOutside } from './../model/useOnClickOutside'

function NotesPage() {
  const [isOpenForm, setOpenForm] = useState<boolean>(false)
  const formRef = useRef<HTMLDivElement | null>(null)

  const handler = () => {
    setOpenForm(false)
  }

  useOnClickOutside({ formRef, handler })
  return (
    <div ref={formRef}>
      <form>
        {isOpenForm && <Input placeholder="Название" />}
        <Input placeholder="Заметка..." onClick={() => setOpenForm(true)} />
      </form>
    </div>
  )
}

export { NotesPage }
