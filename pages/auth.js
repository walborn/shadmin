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


const ButtonSubmit = styled(Button)`
padding-left: 20px;
padding-right: 20px;
`

const AuthPage = ({ className }) => {
  const router = useRouter()
  const auth = React.useContext(AuthContext)
  const { loading, error, request } = useHttp()
  const [ credentials, setCredentials ] = React.useState({ email: '', password: '' })
  const disabled = !credentials.email || !credentials.password

  const handleChange = (value, name) => setCredentials({ ...credentials, [name]: value })
  const handleSignIn = async () => {
    if (disabled) return
    try {
      const data = await request('auth/signin', 'POST', { ...credentials })
      auth.login(data.token, data.userId)
      if (data.token) router.push('/masters')
      else toast.error(data.message) 
    } catch (e) {}
  }
  return (
    <>
      <Nav />
      <Layout className={className}>
        <form>
          <Input id="email" placeholder="E-mail" type="text" name="email" onChange={handleChange}/>
          <Input id="password" placeholder="Password" type="password" name="password"onChange={handleChange} />
          <ButtonSubmit onClick={handleSignIn} disabled={loading || disabled}>Войти</ButtonSubmit>
        </form>
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

/*
  const handleSignUp = async () => {
    try {
      const data = await request('auth/signup', 'POST', { ...credentials })
      toast(data.message)
    } catch (e) {}
  }


  <ButtonSubmit onClick={handleSignUp} disabled={loading || disabled}>Sign Up</ButtonSubmit>
  */