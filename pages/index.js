import React from 'react'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import useHttp from '../hooks/http'
import Router, { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()
  const { request, loading } = useHttp()

  React.useEffect(() => {
    const { token, userId } = JSON.parse(window.localStorage.getItem('userData')) || {}
    Router.prefetch('/masters')
    request(`user/item/${userId}`, 'GET', null, { Authorization: `Bearer ${token}` })
      .then(({ _id }) => router.push(_id ? '/masters' : '/auth'))
  }, [])

  return (
    <>
      <Nav />
      <Layout title="Index | admin"></Layout>
    </>
  )
}

export default Index