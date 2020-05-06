import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Nav from '../components/Nav'
import Input from '../components/Input'
import Button from '../components/Button'
import AuthContext from '../context/auth'
import useHttp from '../hooks/http'

import Layout from '../components/Layout'

const AuthPage = ({ className }) => {
  const router = useRouter()
  const auth = React.useContext(AuthContext)
  const { loading, error, request, clearError } = useHttp()
  const [ credentials, setCredentials ] = React.useState({ email: '', password: '' })

  // React.useEffect(() => { toast(error); clearError() }, [error, clearError])
  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })
  const handleSignUp = async () => {
    try {
      const data = await request('https://yogaclubom.herokuapp.com/api/auth/signup', 'POST', { ...credentials })
      toast(data.message)
    } catch (e) {}
  }
  const handleSignIn = async () => {
    try {
      const data = await request('https://yogaclubom.herokuapp.com/api/auth/signin', 'POST', { ...credentials })
      auth.login(data.token, data.userId)
      if (data.token) router.push('/masters')
      else toast.error(data.message) 
    } catch (e) {}
  }
  return (
    <>
      {auth.token && <Nav />}
      <Layout className={className}>
        <Input id="email" placeholder="email address" type="text" name="email" onChange={handleChange}/>
        <Input id="password" placeholder="password" type="password" name="password"onChange={handleChange} />
        <Button onClick={handleSignIn} disabled={loading} background="#4d99f5">Sign In</Button>
      </Layout>
    </>
  )
}

export default styled(AuthPage)`
padding: 60px 0;
${Input} {
  display: block;
  max-width: 300px;
  margin: 10px auto;
}
${Button} {
  display: block;
  max-width: 300px;
  margin: 20px auto;
}
`
