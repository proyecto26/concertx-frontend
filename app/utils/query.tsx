/* eslint-disable react/display-name */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ComponentType, PropsWithChildren } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // a back-off delay is gradually applied to each retry attempt
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 8000),
    },
  },
});

export function withQueryClientProvider<T extends PropsWithChildren>(
  WrappedComponent: ComponentType<T>,
): ComponentType<T> {
  return function (props: T) {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    )
  }
}
