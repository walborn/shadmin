import React from 'react'
import update from 'immutability-helper'
import fetch from 'node-fetch'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import useHttp from '../hooks/http'
import AuthContext from '../context/auth'

import Nav from '../components/Nav'
import Layout from '../components/Layout'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Card from '../components/Card'
import Submit from '../components/Submit'
import DeleteSVG from '../public/svg/delete.svg'
import DuplicateSVG from '../public/svg/duplicate.svg'
import AddSVG from '../public/svg/add.svg'

const Master = styled(props => props.disabled ? <div {...props} /> : <Card {...props} />)`
position: relative;
margin: 10px 0;
padding: 20px;
text-align: center;
box-sizing: border-box;
box-shadow: ${props => props.theme.border.shadow.index};
border-radius: 6px;
transition: opacity .3s ease-in-out;
background: ${props => props.theme.background.inner};

&:hover {
  opacity: 1;
  box-shadow: ${props => props.theme.border.shadow.hover};
  ${props => !props.disabled
    ? `
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
    }` : ''
  }
}


> *:not(:last-child) {
  margin-bottom: 10px;
}
`

const Controls = styled.div`
> svg {
  width: 32px;
  height: 32px;
  margin: 10px;
  fill: ${props => props.theme.font.color.disabled};
  cursor: pointer;
  :hover { fill: ${props => props.theme.font.color.index}; fill-opacity: 0.6; }
}
`
const Add = styled(props => <div {...props}><AddSVG /></div>)`
text-align: center;
> svg {
  width: 32px;
  height: 32px;
  margin: 10px;
  fill: ${props => props.theme.font.color.disabled};
  cursor: pointer;
  :hover { fill: ${props => props.theme.font.color.index}; fill-opacity: 0.6; }
}
`

const fetcher = url => fetch(`https://yogaclubom.herokuapp.com/api/${url}`).then(r => r.json())

const Masters = () => {
  const { request, loading } = useHttp()
  const { token } = React.useContext(AuthContext)

  const { data, error } = useSWR('master/list', fetcher)
  const [ list, setList ] = React.useState(data)
  const [ origin, setOrigin ] = React.useState(data)
  const [ nextId, setNextId ] = React.useState(0)

  const updateList = async () => {
    try {
      const fetched = await request('master/list', 'POST',
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

  const handleChange = (id, key) => value => {
    const i = list.findIndex(({ _id }) => _id === id)
    setList([ ...list.slice(0, i), { ...list[i], [key]: value }, ...list.slice(i + 1) ])
  }

  const handleAdd = () => {
    setList([ ...list, { _id: nextId, name: '', description: '' } ])
    setNextId(nextId + 1)
  }

  const handleDuplicate = (id) => () => {
    const i = list.findIndex(({ _id }) => _id === id)
    setList([ ...list.slice(0, i + 1), { ...list[i], _id: nextId }, ...list.slice(i + 1) ])
    setNextId(nextId + 1)
  }

  const handleDelete = (id) => () => {
    const i = list.findIndex(({ _id }) => _id === id)
    setList([ ...list.slice(0, i), ...list.slice(i + 1) ])
  }

  const renderCard = ({ _id, name, description }, index) => (
    <Master key={_id} index={index} id={_id} moveCard={moveCard} disabled={!token}>
      <Input value={name} placeholder="name" onChange={handleChange(_id, 'name')} disabled={!token} />
      <TextArea value={description} placeholder="description" onChange={handleChange(_id, 'description')} disabled={!token} />
      <Controls hidden={!token}>
        <DuplicateSVG onClick={handleDuplicate(_id)}/>
        <DeleteSVG onClick={handleDelete(_id)} />
      </Controls>
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

  return (
    <>
      <Nav />
      <Layout title="Master list | Shadmin">
        {(list || data).map((i, index) => renderCard(i, index))}
        <Add onClick={handleAdd} hidden={!token} />
      </Layout>
      <Submit onClick={updateList} disabled={noChanges()} hidden={!token} />
    </>
  )
}

export default Masters
