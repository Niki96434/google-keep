import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/shared/api/msw/node'
import '@testing-library/jest-dom/vitest'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
