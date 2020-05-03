import fetch from 'node-fetch'
import Layout from '../../components/Layout'

export default function Masters({ data }) {
  return (
    <Layout title="Server Side | Shadmin">
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('https://yogaclubom.herokuapp.com/api/master/list')
  const data = await res.json()
  return { props: { data } }
}