import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import AuthContext from '../context/auth'
import SignInSVG from '../public/avatar/signin2.svg'

const UserAvatar = styled(({ auth, path, ...props }) => (
  <div {...props}>
    <div>
      <Link href="/auth"><a><SignInSVG active={path === 'auth'} /></a></Link>
    </div>
    <div>
      <img src={`/avatar/${auth.userId}.png`} />
    </div>
  </div>
))`

> div {
  :last-child {
    display: inline-block;
    padding: 8px;
    border-radius: 50%;
    background: ${props => props.theme.font.color.disabled};
    font-size: 0;
    > img {
      width: 32px;
      height: 32px;
    }
  }
  :first-child {
    display: inline-block;
    padding: 8px;
    border-radius: 50%;
    background: transparent;
    font-size: 0;
    width: fit-content;
    opacity: 0;
    transition: opacity .3s;
    :hover > a > svg {
      fill: ${props => props.theme.button.background.hover};
    }
    > a > svg {
      width: 32px;
      height: 32px;
      fill: ${props => props.theme.button.background.index};
    }
  }
}
:hover {
  > div:first-child {
    opacity: 1;
  }
}
`

const PlaceholderAvatar = styled(({ auth, ...props }) => (<div {...props}><SignInSVG /></div>))`
padding: 5px;
border-radius: 50%;
background: transparent;
font-size: 0;
:hover > svg {
  fill: ${props => props.theme.button.background.hover};
}
> svg {
  width: 32px;
  height: 32px;
  fill: ${props => props.theme.background.default};
}
`

const Avatar = (props) => {
  const router = useRouter()
  const path = (x => (Array.isArray(x) ? x[0] : ''))(router.pathname.match(/[a-z]+/))
  const auth = React.useContext(AuthContext)
  return auth.userId
    ? <UserAvatar auth={auth} path={path} {...props} onClick={auth.logout} />
    : <Link href="/auth"><a><PlaceholderAvatar {...props} active={path === 'auth'} /></a></Link>
}

export default styled(Avatar)``
