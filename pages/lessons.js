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


const Lesson = styled(Card)`
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

const Lessons = () => {
  const { request, loading } = useHttp()
  const { token } = React.useContext(AuthContext)

  const { data, error } = useSWR('https://yogaclubom.herokuapp.com/api/lesson/list', fetcher)
  const [ list, setList ] = React.useState(data)
  const [ origin, setOrigin ] = React.useState(data)

  const updateList = async () => {
    try {
      const fetched = await request(
        `https://yogaclubom.herokuapp.com/api/lesson/list`, 'POST',
        { list },
        { Authorization: `Bearer ${token}` },
      )
      
      if (fetched.message) toast.error(<div><h3>Ошибка!</h3><p>{fetched.message}</p></div>) 
      else {
        setOrigin(list)
        toast.success(<div><h3>Успешно!</h3><p>Расписание было обновлено</p></div>)
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

  if (error) return <Layout><Error>Ошибка запроса получения расписания.<br />Обратитесь за помощью к админу</Error></Layout>
  if (!data || loading) return <Layout><Loading /></Layout>

  const handleChange = (_id, field) => e => {
    const ix = list.findIndex(i => i._id === _id)
    const next = { ...list[ix], [field]: e.target.value }
    setList([ ...list.slice(0, ix), next, ...list.slice(ix+1) ])
  }

  const renderCard = (lesson, index) => (
    <Lesson key={lesson._id} index={index} id={lesson._id} moveCard={moveCard}>
      <Input value={lesson.master} placeholder="master" onChange={handleChange(lesson._id, 'master')} />
      <Input value={lesson.day} placeholder="day" onChange={handleChange(lesson._id, 'day')} />
      <Input value={lesson.time} placeholder="time" onChange={handleChange(lesson._id, 'time')} />
      <TextArea value={lesson.title} placeholder="title" onChange={handleChange(lesson._id, 'title')}/>
    </Lesson>
  )

  const noChanges = () => {
    if (!list) return true
    if (list.length !== origin.length) return false
    for (let i = 0; i < list.length; i++) {
      const a = list[i], b = origin[i]
      for (i of [ 'day', 'duration', 'time', 'master', 'title', 'room', 'note', 'level', 'hidden' ])
        if (a[i] !== b[i]) return false
    }
    return true
  }

  return (
    <>
      <Nav>
        <ButtonSubmit
          onClick={updateList}
          disabled={noChanges()}
          background="#4d99f5"
        >
          Сохранить изменения
        </ButtonSubmit>
      </Nav>
      <Layout title="Lesson list | Shadmin">
        {(list || data).map((i, index) => renderCard(i, index))}
      </Layout>
    </>
  )
}

export default Lessons