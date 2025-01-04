'use client'

import { LiveQueryProvider } from '@sanity/preview-kit'
import { client } from '@/sanity/lib/client'
import { ReactNode } from 'react'

export function SanityProvider({ children }: { children: ReactNode }) {
    return (
        <LiveQueryProvider client={client}>
            {children}
        </LiveQueryProvider>
    )
}