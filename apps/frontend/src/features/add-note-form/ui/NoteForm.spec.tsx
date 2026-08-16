import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { NoteForm } from './NoteForm'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'

describe('intergation test for NoteForm', () => {
  it('happy path', async () => {
    const user = userEvent.setup()
    const client = new QueryClient()
    //1 рендерится инпут
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <QueryClientProvider client={client}>{children}</QueryClientProvider>
    }
    render(<NoteForm />, { wrapper })
    const textarea = screen.getByPlaceholderText(/заметка/i)
    expect(textarea).toBeInTheDocument()
    //2 при клике на текстареа
    await user.click(textarea)
    // должна рендериться 2 новые текстареа
    const firstTextarea = await screen.findByPlaceholderText(/название/i)
    const secondTextarea = await screen.findByPlaceholderText(/заметка/i)
    expect(firstTextarea).toBeInTheDocument()
    // и кнопка закрыть(?)
    const button = await screen.findByText(/закрыть/i)
    expect(button).toBeInTheDocument()
    //3 поля формы заполняются
    const titleNote = 'супер критически важное дело'
    await user.type(firstTextarea, titleNote)
    const titleValue = await screen.findByDisplayValue(titleNote)
    expect(titleValue).toBeInTheDocument()

    const textNote = 'почистить зубы'
    await user.type(secondTextarea, textNote)
    const contentValue = await screen.findByDisplayValue(textNote)
    expect(contentValue).toBeInTheDocument()

    //4 юзер кликает по кнопке закрыть и отправляется запрос
    await user.click(button)

    //5 данные отправляются на сервер
    const res = await axios.post(`http://localhost:${import.meta.env.SERVER_PORT}`, {
      title: 'Заметка 4',
      content: 'Содержимое четвёртой заметки',
    })

    //6 msw перехватывает сетевой запрос(?)
    const newNote = await res.data
    expect(newNote.note).toEqual({
      id: '01928d73-d8ed-7211-a314-7081d763282a',
      user_id: 'deepseek-28d73-d8ed-7211-a314-7081d763382d',
      title: 'Заметка 4',
      content: 'Содержимое четвёртой заметки',
    })

    // проверка что мутация вызвалась(создание заметки) с правильными входными данными
    // проверка что форма закрылась, и вместо нее появилась одиночная textarea
  })
})

//https://mswjs.io/docs/quick-start
