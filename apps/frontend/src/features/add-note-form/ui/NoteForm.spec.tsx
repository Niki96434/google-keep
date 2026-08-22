import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { NoteForm } from './NoteForm'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const renderWithProviders = (ui: React.ReactNode) => {
  const user = userEvent.setup()
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={client}>
        <div data-testid="background">{children}</div>
      </QueryClientProvider>
    )
  }
  return {
    user,
    ...render(ui, { wrapper }),
  }
}

describe('integration tests for NoteForm', () => {
  const titleNote = 'Заметка 4'
  const textNote = 'Содержимое четвёртой заметки'

  it('should create a note by clicking on the button', async () => {
    const { user } = renderWithProviders(<NoteForm />)

    await user.click(screen.getByPlaceholderText(/заметка/i))

    const firstTextarea = await screen.findByPlaceholderText(/название/i)
    const secondTextarea = await screen.findByPlaceholderText(/заметка/i)

    const button = await screen.findByText(/закрыть/i)

    await user.type(firstTextarea, titleNote)
    expect(firstTextarea).toHaveValue(titleNote)

    await user.type(secondTextarea, textNote)
    expect(secondTextarea).toHaveValue(textNote)

    await user.click(button)

    const closedForm = screen.queryByPlaceholderText(/название/i)
    expect(closedForm).not.toBeInTheDocument()
  })

  it('should create a note when clicking on everything except the form', async () => {
    const { user } = renderWithProviders(<NoteForm />)

    await user.click(screen.getByPlaceholderText(/заметка/i))

    const firstTextarea = await screen.findByPlaceholderText(/название/i)
    const secondTextarea = await screen.findByPlaceholderText(/заметка/i)

    await user.type(firstTextarea, titleNote)
    expect(firstTextarea).toHaveValue(titleNote)

    await user.type(secondTextarea, textNote)
    expect(secondTextarea).toHaveValue(textNote)

    const background = screen.getByTestId('background')
    await user.click(background)

    expect(screen.queryByPlaceholderText(/название/i)).not.toBeInTheDocument()
  })
})
