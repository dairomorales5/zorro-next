'use client'

import {NextUIProvider} from '@nextui-org/react'
import { ConversationProvider } from './context/context'

export function Providers({ children }) {
  return (
    <ConversationProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ConversationProvider>
  )
}