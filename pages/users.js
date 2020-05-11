import React from 'react'
import update from 'immutability-helper'
import useSWR from 'swr'
import styled from 'styled-components'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Card from '../components/Card'
import useHttp from '../hooks/http'
import AuthContext from '../context/auth'


const User = styled(Card)`
position: relative;
margin: 10px 0;
padding: 20px;
text-align: center;
box-sizing: border-box;
box-shadow: ${props => props.theme.shadow.index};
border-radius: 6px;
transition: opacity .3s ease-in-out;
background-color: #ffffff;
&:hover {
  opacity: 1;
  box-shadow: ${props => props.theme.shadow.hover};
  &:before {
    content: '⋮';
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
  &:after {
    content: '⋮';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}
> *:not(:last-child) {
  margin-bottom: 10px;
}`


const Users = () => {
  const { request, loading } = useHttp()
  const { token } = JSON.parse(localStorage.getItem('userData'))
  const fetcher = url => request(url, 'GET', null, { Authorization: `Bearer ${token}` })

  const { data, error } = useSWR('user/list', fetcher)
  const [ list, setList ] = React.useState(data)

  React.useEffect(() => { setList(data); }, [ data ])

  const moveCard = React.useCallback((dragIndex, hoverIndex) => {
    const dragCard = list[dragIndex]
    setList(update(list, { $splice: [ [ dragIndex, 1 ], [ hoverIndex, 0, dragCard ] ] }))
  }, [ list ])

  if (error) return <Layout><Error>Ошибка запроса получения пользователей.<br />Обратитесь за помощью к админу</Error></Layout>
  if (!data || loading) return <Layout><Loading /></Layout>

  const renderCard = (user, index) => (
    <User key={user._id} index={index} id={user._id} moveCard={moveCard}>
      <div>{user.email}</div>
    </User>
  )

  return (
    <>
      <Nav />
      <Layout title="User list | Shadmin">
        {(list || data).map((i, index) => renderCard(i, index))}
      </Layout>
    </>
  )
}

export default Users