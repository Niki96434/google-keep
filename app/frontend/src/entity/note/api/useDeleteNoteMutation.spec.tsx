import { render, renderHook, waitFor } from '@testing-library/react';
import { useDeleteNoteMutation } from './useDeleteNoteMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';

function renderHookWithProviders() {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: React.ReactElement) =>
    render(<QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>);

  const { result, rerender } = renderHook(() => useDeleteNoteMutation(), { wrapper });
  return { result, rerender };
}

describe('deleting notes', () => {
  it.todo('should call DELETE /api/v1/notes/:id with the provided noteId', async () => {
    const { result, rerender } = renderHookWithProviders();
    const noteId = '12345678910';

    rerender(noteId);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it.todo('should invalidate ["notes"] query on success', () => {});

  it.todo('should handle mutation failure', () => {});
});
