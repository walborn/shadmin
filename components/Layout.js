import Head from './Head'
import Row from './Row'
import Nav from './Nav'

const Layout = props => (
  <>
    <Head title={props.title} />
    <Nav />
    <Row>
      <h1>{props.title}</h1>
      <main>{props.children}</main>
    </Row>
  </>
)
export default Layout