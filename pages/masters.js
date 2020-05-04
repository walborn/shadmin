import React from 'react'
import update from 'immutability-helper'
import fetch from 'node-fetch'
import useSWR from 'swr'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Button from '../components/Button'
import Card from '../components/Card'


const Master = styled(Card)`
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
}`

const fetcher = url => fetch(url).then(r => r.json())

const Masters = (props) => {
  const { data, error } = useSWR('https://yogaclubom.herokuapp.com/api/master/list', fetcher/*, { initialData: props.data }*/)
  const [ list, setList ] = React.useState(data)
  React.useEffect(() => { setList(data); }, [ data ])

  const moveCard = React.useCallback((dragIndex, hoverIndex) => {
    const dragCard = list[dragIndex]
    setList(update(list, { $splice: [ [ dragIndex, 1 ], [ hoverIndex, 0, dragCard ] ] }))
  }, [ list ])

  if (error) return <Layout><Error>Failed to load masters</Error></Layout>
  if (!data) return <Layout><Loading /></Layout>

  const handleChange = (_id, field) => e => {
    const ix = list.findIndex(i => i._id === _id)
    const next = { ...list[ix], [field]: e.target.value }
    setList([ ...list.slice(0, ix), next, ...list.slice(ix+1) ])
  }
  const handleSubmit = () => {
    console.log(list)
    fetch('https://yogaclubom.herokuapp.com/api/master/list', {
      method: 'post',
      body: JSON.stringify({ list: list.map(i => ({ id: i.id, name: i.name, description: i.description })) }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
  }


  const renderCard = ({ _id, name, description }, index) => (
    <Master key={_id} index={index} id={_id} moveCard={moveCard}>
      <Input value={name} placeholder="name" onChange={handleChange(_id, 'name')} />
      <TextArea value={description} placeholder="description" onChange={handleChange(_id, 'description')}/>
    </Master>
  )

  return (
    <Layout title="Master list | Shadmin">
      {(list || data).map((i, index) => renderCard(i, index))}
      <Button onClick={handleSubmit}>Save</Button>
    </Layout>
  )
}

// export async function getServerSideProps() {
//   const data = await fetcher('https://yogaclubom.herokuapp.com/api/master/list')
//   return { props: { data } }
// }

export default Masters