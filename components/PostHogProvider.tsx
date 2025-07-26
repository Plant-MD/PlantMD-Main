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
      // Disable PostHog for testing when no API key is provided
      console.log('PostHog disabled - no API key provided')
    }
  }, [])

  // If no PostHog key, render children without PostHog provider
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!posthogKey) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
