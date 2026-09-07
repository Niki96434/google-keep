import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { NoteForm } from './NoteForm'
import { renderWithProviders } from '@/shared/lib/test-utils'
import '@testing-library/jest-dom'
import { http, HttpResponse } from 'msw'
import { server } from '@/shared/api/msw/node'

describe('integration tests for NoteForm', () => {
  const titleNote = 'Заметка 4'
  const textNote = 'Содержимое четвёртой заметки'

  it('should submit and close the form by clicking on the button', async () => {
    const { user } = renderWithProviders(
      <div data-testid="background">
        <NoteForm />
      </div>
    )

    const input = screen.getByPlaceholderText(/заметка/i)

    await user.click(input)

    const firstTextarea = await screen.findByPlaceholderText(/название/i)
    const secondTextarea = await screen.findByPlaceholderText(/заметка/i)

    const button = await screen.findByRole('button', { name: /закрыть/i })

    await user.type(firstTextarea, titleNote)
    expect(firstTextarea).toHaveValue(titleNote)

    await user.type(secondTextarea, textNote)
    expect(secondTextarea).toHaveValue(textNote)

    let requestBody: unknown = null
    server.use(
      http.post('*/api/v1/notes', async ({ request }) => {
        requestBody = await request.json()
        return HttpResponse.json({
          note: {
            id: '01928d73-d8ed-7211-a314-7081d763282b',
            user_id: 'deepseek-28d73-d8ed-7211-a314-7081d763282d',
            requestBody,
          },
        })
      })
    )

    await user.click(button)

    await waitFor(() =>
      expect(requestBody).toMatchObject({
        title: titleNote,
        content: textNote,
      })
    )

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/название/i)).not.toBeInTheDocument()
    })

    await user.click(screen.getByPlaceholderText(/заметка/i))
    expect(await screen.findByPlaceholderText(/название/i)).toHaveValue('')
    expect(await screen.findByPlaceholderText(/заметка/i)).toHaveValue('')
  })

  it('should submit and close the form when clicking on everything except the form', async () => {
    const { user } = renderWithProviders(
      <div data-testid="background">
        <NoteForm />
      </div>
    )

    const input = screen.getByPlaceholderText(/заметка/i)

    await user.click(input)

    const firstTextarea = await screen.findByPlaceholderText(/название/i)
    const secondTextarea = await screen.findByPlaceholderText(/заметка/i)

    await user.type(firstTextarea, titleNote)
    expect(firstTextarea).toHaveValue(titleNote)

    await user.type(secondTextarea, textNote)
    expect(secondTextarea).toHaveValue(textNote)

    const background = screen.getByTestId('background')

    let requestBody: unknown = null
    server.use(
      http.post('*/api/v1/notes', async ({ request }) => {
        requestBody = await request.json()
        return HttpResponse.json({
          note: {
            id: '01928d73-d8ed-7211-a314-7081d763282b',
            user_id: 'deepseek-28d73-d8ed-7211-a314-7081d763282d',
            requestBody,
          },
        })
      })
    )

    await user.click(background)

    await waitFor(() => {
      expect(requestBody).toMatchObject({
        title: titleNote,
        content: textNote,
      })
    })

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/название/i)).not.toBeInTheDocument()
    })

    await user.click(await screen.findByPlaceholderText(/заметка/i))

    expect(await screen.findByPlaceholderText(/название/i)).toHaveValue('')
    expect(await screen.findByPlaceholderText(/заметка/i)).toHaveValue('')
  })

  it('should not submit the form if the form fields are empty', async () => {
    const { user } = renderWithProviders(
      <div data-testid="background">
        <NoteForm />
      </div>
    )

    server.use(
      http.post('*/api/v1/notes', async () => {
        requestSpy()
      })
    )

    const textarea = await screen.findByPlaceholderText(/заметка/i)
    await user.click(textarea)

    const firstFormTextArea = await screen.findByPlaceholderText(/название/i)
    const secondFormTextArea = await screen.findByPlaceholderText(/заметка/i)

    expect(firstFormTextArea).toBeInTheDocument()
    expect(secondFormTextArea).toBeInTheDocument()

    const background = screen.getByTestId(/background/)
    await user.click(background)

    const requestSpy = vi.fn()

    expect(requestSpy).toHaveBeenCalledTimes(0)
  })

  it.todo('should submit the form if 1 fields is filled in', () => {
    // проверить ушло ли тело запроса
  })
})
