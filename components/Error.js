import styled from 'styled-components'

export default styled(({ children, ...props }) => <div {...props}><div>{children}</div></div>)`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 1001;
background: radial-gradient(rgba(255,255,255,1) 16%,rgba(255,255,255,0.5) 100%);
> div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 32px;
}`