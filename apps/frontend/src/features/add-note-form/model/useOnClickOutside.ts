import { useEffect, type RefObject } from 'react'

interface OnClickOutside<T extends HTMLElement = HTMLElement> {
  formRef: RefObject<T | null>
  handleNext: () => void
}

type EventType = MouseEvent | TouchEvent

export function useOnClickOutside({ formRef, handleNext }: OnClickOutside) {
  useEffect(() => {
    const listener = (event: EventType) => {
      if (!formRef.current || formRef.current.contains(event.target as Node)) {
        return
      }
      handleNext()
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [formRef, handleNext])
}
