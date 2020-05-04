import styled from 'styled-components'
import Layout from '../components/Layout'

const Header = styled.header`
text-align: center;
font-weight: bold;
font-size: 32px;
padding: 20px;
`

const Home = () => (
  <Layout title="Home | Shadmin">
    <Header>Admin panel</Header>
  </Layout>
)

export default Home
