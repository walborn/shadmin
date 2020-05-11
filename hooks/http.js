import { useState, useCallback } from 'react'
import fetch from 'node-fetch'

export default () => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    url = `https://yogaclubom.herokuapp.com/api/${url}`
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if (!response.ok) setError(data.message || 'Something went wrong')
      setLoading(false)
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e     
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])
  return { loading, error, request, clearError }
}