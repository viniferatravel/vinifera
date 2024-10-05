'use client'
import { NextUIProvider } from '@nextui-org/react';
import { store } from '@/app/redux/store';
import { Provider } from 'react-redux';
import { Suspense } from 'react';

export function Providers({ children }) {
  return (
    <Provider store={store}>
    <NextUIProvider>
        <Suspense>
          {children}
        </Suspense>
    </NextUIProvider>
    </Provider>
  )
}