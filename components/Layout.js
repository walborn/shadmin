import styled from 'styled-components'

import Head from './Head'
import Row from './Row'
import Normilize from './Normilize'
import Atom from './Atom'

const Layout = props => (
  <div className={props.className}>
    <Head title={props.title} />
    <Normilize />
    <Row>
      <main>{props.children}</main>
    </Row>
  </div>
)
export default styled(Layout)`padding-bottom: 30px;`