import type { NotesGetOut } from './../../../../../packages/shared/notes/types'

export default function getMockNotes(): NotesGetOut {
  return {
    notes: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        user_id: '123e4567-e89b-12d3-a456-426614174123',
        title: 'Тестовая заметка',
        content: 'Контент',
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        user_id: '123e4567-e89b-12d3-a456-426614174123',
        title: 'План по пет-проекту',
        content: 'Создать визуальный редактор для css/html',
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        user_id: '123e4567-e89b-12d3-a456-426614174123',
        title: 'Старые идеи',
        content: 'Идея для приложения: crm по поиску работы',
      },
    ],
  }
}
