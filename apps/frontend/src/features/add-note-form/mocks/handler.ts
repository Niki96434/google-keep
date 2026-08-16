import { http, HttpResponse } from 'msw'

const url = `http://localhost:${import.meta.env.SERVER_PORT}`
export const handlers = [
  http.get(`${url}/api/v1/notes`, () => {
    return HttpResponse.json({
      notes: [
        {
          id: '01928d73-d8ed-7211-a314-7081d763271c',
          user_id: 'gpt-1201928d73-d8ed-7211-a314-7081d763271d',
          title: 'Заметка 1',
          content: 'Содержимое первой заметки',
        },
        {
          id: '01928d73-d8ed-7211-a314-7081d763271b',
          user_id: 'codex-28d73-d8ed-7211-a314-7081d763271d',
          title: 'Заметка 2',
          content: 'Содержимое второй заметки',
        },
        {
          id: '01928d73-d8ed-7211-a314-7081d763271a',
          user_id: 'deepseek-28d73-d8ed-7211-a314-7081d763271d',
          title: 'Заметка 3',
          content: 'Содержимое третьей заметки',
        },
      ],
    })
  }),
  http.post(`${url}/api/v1/notes`, () => {
    return HttpResponse.json({
      note: {
        id: '01928d73-d8ed-7211-a314-7081d763282a',
        user_id: 'deepseek-28d73-d8ed-7211-a314-7081d763382d',
        title: 'Заметка 4',
        content: 'Содержимое четвёртой заметки',
      },
    })
  }),
]
