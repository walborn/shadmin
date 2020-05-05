import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Headroom from 'react-headroom'
import styled from 'styled-components'
import Row from './Row'


const Item = styled.a`
text-decoration: none;
cursor: pointer;
&:hover {
  color: ${props => props.theme.color.blue.light};
}
${props => props.active ? `
color: ${props.theme.color.blue.light};
font-weight: bold;
` : 'color: #5d616f;'}
`

const links = [
  { key: 'shedule', href: 'shedule', title: 'Расписание' },
  { key: 'masters', href: 'masters', title: 'Инструкторы' },
  // { key: 'shedule', href: 'shedule', title: 'Расписание' },
]

const Nav = (props) => {
  const router = useRouter()
  const active = (x => (Array.isArray(x) ? x[0] : ''))(router.pathname.match(/[a-z]+/))

  return (
    <Headroom>
      <div className={props.className}>
        <Row>
          <ul>
            {
              links.map(i => (
                <li key={i.key}>
                  <Link href={`/${i.href}`}><Item active={active === i.key}>{i.title}</Item></Link>
                </li>
              ))
            }
          </ul>
          {props.children}
        </Row>
      </div>
    </Headroom>
  )
}

export default styled(Nav)`
background: #ffffff;
border-bottom: 1px solid ${props => props.theme.border.color};
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
    padding: 20px 15px;
  }
}
`
