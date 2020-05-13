import styled from 'styled-components'

const GreenButton = styled.button`
position: fixed;
display: inline-flex;
right: 16px;
bottom: 16px;
width: 60px;
height: 60px;
margin: 0;
padding: 0;
color: ${props => props.theme.button.color.index};
cursor: pointer;
line-height: 1em;
align-items: center;
white-space: nowrap;
justify-content: center;
background: ${props => props.theme.button.background.index};
border-width: 1px;
border-style: solid;
border-image: initial;
outline: none;
border-color: transparent;
border-radius: 50%;
text-decoration: none;
transition: all 250ms ease-out 0s;
&:hover {
  background: ${props => props.theme.button.background.hover};
}
&:disabled {
  display: none;
}
svg {
  display: flex;
  font-size: 24px;
  align-items: center;
  justify-content: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  margin: 0;
}`

export default (props) => props.disabled
  ? null
  : (
    <GreenButton {...props}>
      <svg preserveAspectRatio="xMidYMid meet" height="1em" width="1em" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"    class="icon-7f6730be--text-3f89f380">
        <g><polyline points="20 6 9 17 4 12"></polyline></g>
      </svg>  
    </GreenButton>
  )