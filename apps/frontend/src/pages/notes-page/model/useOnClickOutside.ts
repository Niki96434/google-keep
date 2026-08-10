import { useEffect, type RefObject } from 'react'

interface OnClickOutside<T extends HTMLElement = HTMLElement> {
  formRef: RefObject<T | null>
  handler: () => void
}

export function useOnClickOutside({ formRef, handler }: OnClickOutside) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!formRef.current || formRef.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [formRef, handler])
  return
}
