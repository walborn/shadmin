import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import AuthContext from '../context/auth'
import SignInSVG from '../public/avatar/signin2.svg'


const User = (props) => {
  const [ hidden, setHidden ] = React.useState(true)
  const handleSignOut = () => !hidden && props.signout()

  return (
    <div className={props.className}>
      <div className={`user__signout ${hidden ? 'hidden' : 'visible'}`} onClick={handleSignOut}>
        <Link href="/auth"><a><SignInSVG active={props.path === 'auth'} /></a></Link>
      </div>
      <div className="user__avatar" onClick={() => { console.log(hidden); setHidden(!hidden) }}>
        <img src={`/avatar/${props.auth.userId}.png`} />
      </div>

    </div>
  )
}

const UserAvatar = styled(User)`
.user__avatar {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  padding: 8px;
  border-radius: 50%;
  background: ${props => props.theme.background.default};
  font-size: 0;
  cursor: pointer;
  > img {
    width: 32px;
    height: 32px;
  }
}
.user__signout {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  border-radius: 50%;
  background: transparent;
  font-size: 0;
  width: fit-content;
  opacity: 0;
  transition: opacity 1s, right .5s;
  :hover > a > svg {
    fill: ${props => props.theme.button.background.hover};
  }
  > a > svg {
    width: 32px;
    height: 32px;
    fill: ${props => props.theme.button.background.index};
  }
  &.hidden {
    visibility: hidden;
    right: 0;
    opacity: 0;
  }
  &.visible {
    right: 55px;
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
    ? <UserAvatar auth={auth} path={path} {...props} signout={auth.logout} />
    : <Link href="/auth"><a><PlaceholderAvatar {...props} active={path === 'auth'} /></a></Link>
}

export default styled(Avatar)``
