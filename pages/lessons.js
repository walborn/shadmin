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
import Submit from '../components/Submit'
import Card from '../components/Card'
import DropDown from '../components/DropDown'
import TimeInput from '../components/TimeInput'
import Duration from '../components/Duration'
import { toast } from 'react-toastify'
import useHttp from '../hooks/http'
import AuthContext from '../context/auth'
import { lighten } from 'polished'


const Time = styled.div`
> * {
  margin: 10px 0;
}

@media only screen and (min-width: 400px) {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  column-gap: 10px;
}
`

const Lesson = styled.div`
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
}
> *:not(:last-child) {
  margin-bottom: 10px;
}

`

const Week = styled.div`
margin-top: 20px;
white-space: nowrap;
box-shadow: ${props => props.theme.shadow.index};
`;

const Day = styled.div`
display: inline-block;
box-sizing: border-box;
width: calc(100%/7);
padding: 5px 0;
font-weight: 600;
color: ${props => props.theme.color.gray.dark};
border-left: 0 none;
text-align: center;
outline: none;
cursor: pointer;
transition: background-color 0.2s;
&:first-child {
  border-left: 1px solid ${props => props.theme.color.gray.pale};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
&:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
&:hover, &.overlapped {
  background-color: ${lighten(0.05, '#fbe1c2')};
  border: 1px solid ${lighten(0.05, '#fbe1c2')};
} 
${(props) => props.active
? `
background-color: #fbe1c2;
border: 1px solid ${lighten(0.2, props.theme.color.orange)}`
: ''}`

const weekdays = [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ];

const getLessons = lessons => {
  if (!Array.isArray(lessons)) return [ [], [], [], [], [], [], [] ]
  const list = lessons.reduce((r, i) => { r[i.day].push(i); return r }, [ [], [], [], [], [], [], [] ])

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      list[i][j].day = `${list[i][j].day}`
      list[i][j].time = `${list[i][j].time}`
      list[i][j].duration = `${list[i][j].duration}`
    }
  }
  const compare = (a, b) => {
      if (+a.time < +b.time) return -1
      if (+a.time > +b.time) return 1
      if (+a.duration < +b.duration) return -1
      if (+a.duration > +b.duration) return 1
      return 0
  }

  return list.map(i => i.sort(compare))
}

const fetcher = url => fetch(`https://yogaclubom.herokuapp.com/api/${url}`).then(r => r.json())

const Lessons = () => {
  const { request, loading } = useHttp()
  const { token } = React.useContext(AuthContext)

  const { data, error } = useSWR('lesson/list', fetcher)
  const [ list, setList ] = React.useState(data)
  const [ origin, setOrigin ] = React.useState(data)
  const [ day, setDay ] = React.useState(0)

  React.useEffect(() => {  
    const lessons = getLessons(data)  
    setList(lessons); setOrigin(lessons);
  }, [ data ])

  const updateList = async () => {
    const data = list.reduce((r, i) => [ ...r, ...i ], [])
    try {
      const fetched = await request('lesson/list', 'POST', { list: data }, { Authorization: `Bearer ${token}` } )
      
      if (fetched.message) toast.error(<div><h3>Ошибка!</h3><p>{fetched.message}</p></div>) 
      else {
        const lessons = getLessons(data)  
        setList(lessons); setOrigin(lessons);
        toast.success(<div><h3>Успешно!</h3><p>Расписание было обновлено</p></div>)
      }
    } catch (e) {
      toast.error(<div><h3>Ошибка!</h3><p>Something went wrong</p></div>) 
    }
  }

  const moveCard = React.useCallback((dragIndex, hoverIndex) => {
    const dragCard = list[day][dragIndex]
    const lessons = update(list[day], { $splice: [ [ dragIndex, 1 ], [ hoverIndex, 0, dragCard ] ] })
    setList(update(list, { $splice: [ [ day, 1 ], [ day, 0, lessons ] ] }))
  }, [ list ])

  if (error) return <Layout><Error>Ошибка запроса получения расписания.<br />Обратитесь за помощью к админу</Error></Layout>
  if (!data || loading) return <Layout><Loading /></Layout>

  const handleChange = (_id, field) => e => {
    let lessons = list[day];
    const i = lessons.findIndex(l => l._id === _id)
    const next = { ...lessons[i], [field]: e.target.value }
    lessons = [ ...lessons.slice(0, i), next, ...lessons.slice(i + 1) ]

    setList([ ...list.slice(0, day), lessons, ...list.slice(day + 1) ])
  }

  const noChanges = () => {
    console.log(list[day], origin[day])
    if (!list) return true
    if (list.length !== origin.length) return false
    for (let day = 0; day < 7; day++)
      for (let i = 0; i < list[day].length; i++)
        for (let j of [ 'day', 'duration', 'time', 'master', 'title', 'room', 'note', 'level', 'hidden' ])
          if (list[day][i][j] !== origin[day][i][j]) return false
    return true
  }

  const dayList = [
    { key: '1', children: 'Пн' },
    { key: '2', children: 'Вт' },
    { key: '3', children: 'Ср' },
    { key: '4', children: 'Чт' },
    { key: '5', children: 'Пт' },
    { key: '6', children: 'Сб' },
    { key: '0', children: 'Вс' },
  ]

  return (
    <>
      <Nav />
      <Layout title="Lesson list | Shadmin">
        <Week>
        {
          [ 1, 2, 3, 4, 5, 6, 0 ].map(i => (
            <Day key={i} active={i === day} onClick={() => setDay(i)}>
              {weekdays[i]}
            </Day>
          ))
        }
        </Week>
        {
          list[day].map((lesson, index) => (
            <Lesson key={lesson._id} index={index} id={lesson._id} moveCard={moveCard}>
              <Time>
                <DropDown value={lesson.day} list={dayList} onChange={handleChange(lesson._id, 'day')} />
                <TimeInput value={lesson.time} placeholder="time" onChange={handleChange(lesson._id, 'time')} />
                <Duration value={lesson.duration} placeholder="duration" onChange={handleChange(lesson._id, 'duration')} />
              </Time>
              <Input value={lesson.title} placeholder="title" onChange={handleChange(lesson._id, 'title')} />
              <Input value={lesson.master} placeholder="master" onChange={handleChange(lesson._id, 'master')} />
              <TextArea value={lesson.note} placeholder="note" onChange={handleChange(lesson._id, 'note')}/>
            </Lesson>
          ))
        }
      </Layout>
      <Submit onClick={updateList} disabled={noChanges()} />
    </>
  )
}

export default Lessons
