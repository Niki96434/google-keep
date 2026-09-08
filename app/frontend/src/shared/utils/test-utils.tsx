import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const renderWithProviders = (ui: React.ReactElement) => {
  const user = userEvent.setup()
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  })
  return {
    user,
    ...render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>),
  }
}
