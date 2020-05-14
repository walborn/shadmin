import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import AuthContext from '../context/auth'
import SignInSVG from '../public/avatar/signin2.svg'

const UserAvatar = styled(({ auth, ...props }) => (<div {...props}><img src={`/avatar/${auth.userId}.png`} /></div>))`
padding: 8px;
border-radius: 50%;
background: ${props => props.theme.background.default};
font-size: 0;
> img {
  width: 32px;
  height: 32px;
}
`

const PlaceholderAvatar = styled(({ auth, ...props }) => (<div {...props}><SignInSVG /></div>))`
padding: 8px;
border-radius: 50%;
background: ${props => props.theme.font.color.active};
font-size: 0;
:hover {
  background: ${props => props.theme.font.color.hover};
}
> svg {
  width: 32px;
  height: 32px;
  fill: ${props => props.theme.background.inner};
}
`

const Avatar = (props) => {
  const auth = React.useContext(AuthContext)
  return auth.userId
    ? <UserAvatar auth={auth} {...props} />
    : <Link href="/auth"><a><PlaceholderAvatar {...props} /></a></Link>
}

export default styled(Avatar)``
