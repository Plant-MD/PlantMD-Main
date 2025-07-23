'use client'

import { useEffect, ReactNode } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

type Props = {
  children: ReactNode
}

export default function PostHogProvider({ children }: Props) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com'
    
    if (posthogKey) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
      })
    } else {
      console.warn('PostHog API key not found in environment variables')
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
