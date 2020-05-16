import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Headroom from 'react-headroom'
import styled from 'styled-components'
import Row from './Row'
import Avatar from './Avatar'
import LessonsSVG from '../public/svg/lessons.svg'
import MastersSVG from '../public/svg/masters2.svg'

const Item = styled.a`
text-decoration: none;
cursor: pointer;
> svg {
  display: none;
  width: 32px;
  height: 32px;
}
&:hover {
  color: ${props => props.theme.font.color.hover};
  > svg {
    fill: ${props => props.theme.font.color.hover};
  }
}
${props => props.active
  ? `
font-weight: bold;
color: ${props.theme.font.color.active};
> svg { fill: ${props.theme.font.color.active}; }
` : `
color: ${props.theme.background.default};
> svg { fill: ${props.theme.background.default}; }
`}

@media only screen and (max-width: 780px) {
  font-size: 0;
  > svg {
    display: inline-block;
  }
}
`


const User = styled(Avatar)`
position: absolute;
right: 20px;
top: 50%;
transform: translateY(-50%);
`

const links = [
  { key: 'lessons', href: 'lessons', title: 'Расписание', Icon: LessonsSVG },
  { key: 'masters', href: 'masters', title: 'Инструкторы', Icon: MastersSVG },
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
              links.map(({ key, href, title, Icon}) => (
                <li key={key}>
                  <Link href={`/${href}`}>
                    <Item active={active === key}>
                      {title}
                      <Icon />
                    </Item>
                  </Link>
                </li>
              ))
            }
          </ul>
          {props.children}
          <User />
        </Row>
      </div>
    </Headroom>
  )
}

export default styled(Nav)`
background: ${props => props.theme.background.inner};
border-bottom: 1px solid ${props => props.theme.border.shadow.index};
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
