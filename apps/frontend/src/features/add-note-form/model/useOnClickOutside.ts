import { useEffect, useRef, type RefObject } from 'react'

interface OnClickOutside<T extends HTMLElement = HTMLElement> {
  formRef: RefObject<T | null>
  onSubmit: () => void
  isOpenForm: boolean
}

type EventType = MouseEvent | TouchEvent

export function useOnClickOutside({ formRef, onSubmit, isOpenForm }: OnClickOutside) {
  const onSubmitRef = useRef(onSubmit)

  useEffect(() => {
    const listener = (event: EventType) => {
      if (!formRef.current || formRef.current.contains(event.target as Node)) {
        return
      }
      if (isOpenForm) {
        onSubmitRef.current()
      }
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [formRef, isOpenForm])
}
