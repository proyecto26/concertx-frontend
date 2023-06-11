import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentType, PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // a back-off delay is gradually applied to each retry attempt
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 8000),
      suspense: false,
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

export const HydrateWithQueryClientProvider = withQueryClientProvider(Hydrate);
