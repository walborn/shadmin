import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

const fetchUser = async () => {
  if (window && window.__user) return window.__user

  const res = await fetch(`${process.env.api}/me`)

  if (!res.ok) {
    delete window.__user
    return null
  }

  const json = await res.json()
  if (window) window.__user = json
  return json
}

export function useFetchUser({ required } = {}) {
  const [ loading, setLoading ] = useState(() => !(window && window.__user))
  const [ user, setUser ] = useState(() => window && window.__user || null)

  useEffect(async () => {
    if (!loading && user) return
    setLoading(true)
    const user = await fetchUser();
    // When the user is not logged in but login is required
    if (required && !user) {
      window.location.href = '/api/login'
      return
    }
    setUser(user)
    setLoading(false)
  }, [])

  return { user, loading }
}