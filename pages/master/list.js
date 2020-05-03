import fetch from 'node-fetch'
import useSWR from 'swr'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'


const Card = styled.div`
margin: 10px 0;
padding: 20px;
text-align: center;
box-sizing: border-box;
box-shadow: ${props => props.theme.shadow.index};
border-radius: 6px;
cursor: pointer;
opacity: 0.95;
transition: opacity .3s ease-in-out;
&:hover {
  opacity: 1;
  box-shadow: ${props => props.theme.shadow.hover};
}
> *:not(:last-child) {
  margin-bottom: 10px;
}
`

const fetchJson = async url => {
  const res = await fetch(url)
  return await res.json()
}

const MasterList = () => {
  const { data, error } = useSWR('https://yogaclubom.herokuapp.com/api/master/list', fetchJson)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <Layout title="Master list | Shadmin">
      {
        data.map(i => (
          <Card>
            <Input value={i.name} placeholder="name"/>
            <TextArea value={i.description} placeholder="description" />
          </Card>
        ))
      }
    </Layout>
  )
}

export default MasterList