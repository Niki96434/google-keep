import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/features/add-note-form/mocks/node'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
