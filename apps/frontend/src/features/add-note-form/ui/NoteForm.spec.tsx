import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { NoteForm } from './NoteForm'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('integration tests for NoteForm', () => {
  it('should create a note by clicking on the button', async () => {
    const user = userEvent.setup()
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <QueryClientProvider client={client}>{children}</QueryClientProvider>
    }

    render(<NoteForm />, { wrapper })
    const textarea = screen.getByPlaceholderText(/заметка/i)
    expect(textarea).toBeInTheDocument()

    await user.click(textarea)

    const firstTextarea = await screen.findByPlaceholderText(/название/i)
    const secondTextarea = await screen.findByPlaceholderText(/заметка/i)
    expect(firstTextarea).toBeInTheDocument()
    expect(secondTextarea).toBeInTheDocument()

    const button = await screen.findByText(/закрыть/i)
    expect(button).toBeInTheDocument()
    const titleNote = 'Заметка 4'
    await user.type(firstTextarea, titleNote)
    expect(firstTextarea).toHaveValue(titleNote)

    const textNote = 'Содержимое четвёртой заметки'
    await user.type(secondTextarea, textNote)
    expect(secondTextarea).toHaveValue(textNote)

    await user.click(button)

    const thirdTextarea = await screen.findByPlaceholderText(/заметка/i)
    expect(thirdTextarea).toBeInTheDocument()

    const closedForm = screen.queryByPlaceholderText(/название/i)
    expect(closedForm).not.toBeInTheDocument()
  })
})
