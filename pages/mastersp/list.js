import fetch from 'node-fetch'
import Layout from '../../components/Layout'

export default function Masters({ data }) {
  return (
    <Layout title="Static Props | Shadmin">
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Layout>
  )
}


export async function getStaticProps(context) {
  const res = await fetch('https://yogaclubom.herokuapp.com/api/master/list')
  const data = await res.json()
  return { props: { data } }
}