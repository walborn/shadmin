import Nav from '../components/Nav'
import Layout from '../components/Layout'
import Error from '../components/Error'

const NotFound = () => (
  <>
    <Nav />
    <Layout title="Not found | admin">
      <Error>404. Страница не найдена</Error>
    </Layout>
  </>
)

export default NotFound