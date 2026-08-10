import { Input, Button } from '@/shared/ui'
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
      {isOpenForm === false && <Input placeholder="Заметка..." onClick={() => setOpenForm(true)} />}
      {isOpenForm && (
        <form>
          <Input placeholder="Название" />
          <Input placeholder="Заметка..." />
          <Button
            size="lg"
            variant="ghost"
            onClick={() => setOpenForm(false)}
            children={'Закрыть'}
          />
        </form>
      )}
    </div>
  )
}

export { NotesPage }
