import React from 'react'
import update from 'immutability-helper'
import fetch from 'node-fetch'
import useSWR from 'swr'
import styled from 'styled-components'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Button from '../components/Button'
import Card from '../components/Card'
import { toast } from 'react-toastify'
import useHttp from '../hooks/http'
import AuthContext from '../context/auth'


const Master = styled(Card)`
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
}

`

const ButtonSubmit = styled(Button)`
padding: 6px 20px;
width: auto;
@media only screen and (max-width: 600px) {
  margin-bottom: 10px;
  float: right;
}
@media only screen and (max-width: 400px) {
  margin-bottom: 10px;
  width: 100%;
}
@media only screen and (min-width: 600px) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
}
`

const fetcher = url => fetch(url).then(r => r.json())

const Masters = () => {
  const { request, loading } = useHttp()
  const { token } = React.useContext(AuthContext)

  const { data, error } = useSWR('https://yogaclubom.herokuapp.com/api/lesson/list', fetcher)
  const [ list, setList ] = React.useState(data)
  const [ origin, setOrigin ] = React.useState(data)


  const fetchList = async () => {
    try {
      const fetched = await request(
        `https://yogaclubom.herokuapp.com/api/lesson/list`, 'POST',
        { list: list.map(i => ({ id: i.id, name: i.name, description: i.description })) },
        { Authorization: `Bearer ${token}` },
      )
      
      if (fetched.message) toast.error(<div><h3>Ошибка!</h3><p>{fetched.message}</p></div>) 
      else {
        setOrigin(list)
        toast.success(<div><h3>Успешно!</h3><p>Инструкторы были обновлены</p></div>)
      }
    } catch (e) {
      toast.error(<div><h3>Ошибка!</h3><p>Something went wrong</p></div>) 
    }
  }

  React.useEffect(() => { setList(data); setOrigin(data); }, [ data ])

  const moveCard = React.useCallback((dragIndex, hoverIndex) => {
    const dragCard = list[dragIndex]
    setList(update(list, { $splice: [ [ dragIndex, 1 ], [ hoverIndex, 0, dragCard ] ] }))
  }, [ list ])

  if (error) return <Layout><Error>Ошибка в загрузке инструкторов. Обратитесь за помощью к админу</Error></Layout>
  if (!data || loading) return <Layout><Loading /></Layout>

  const handleChange = (_id, field) => e => {
    const ix = list.findIndex(i => i._id === _id)
    const next = { ...list[ix], [field]: e.target.value }
    setList([ ...list.slice(0, ix), next, ...list.slice(ix+1) ])
  }

  const renderCard = ({ _id, name, description }, index) => (
    <Master key={_id} index={index} id={_id} moveCard={moveCard}>
      <Input value={name} placeholder="name" onChange={handleChange(_id, 'name')} />
      <TextArea value={description} placeholder="description" onChange={handleChange(_id, 'description')}/>
    </Master>
  )

  const noChanges = () => {
    if (!list) return true
    if (list.length !== origin.length) return false
    for (let i = 0; i < list.length; i++) {
      const a = list[i], b = origin[i]
      if (a.id !== b.id) return false 
      if (a.name !== b.name) return false 
      if (a.description !== b.description) return false
    }
    return true
  }

  console.log(list, data)
  return (
    <>
      <Nav>
        <ButtonSubmit
          onClick={fetchList}
          disabled={noChanges()}
          background="#4d99f5"
        >
          Сохранить изменения
        </ButtonSubmit>
      </Nav>
      <Layout title="Master list | Shadmin">
        {(list || data).map((i, index) => renderCard(i, index))}
      </Layout>
    </>
  )
}

export default Masters