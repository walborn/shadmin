import styled from 'styled-components'
import { darken } from 'polished'


const buttonVariant = ({ font, background, border, disabled }) => `
color: ${font};
background-color: ${background};
border: 1px solid ${border};
border-radius: 4px;
transition: background .1s ease-in-out;
width: 100%;
line-height: 30px;
font-size: inherit;
${disabled
  ? `
cursor: default;
opacity: .5;
pointer-events: none;`
  : `
cursor: pointer;
&:focus {
  border-color: ${darken(.3, border)};
  background-color: ${darken(.1, background)};
  outline: none;
}

&:hover {
  background-color: ${darken(.1, background)};
  border-color: ${darken(.2, border)};
}`
}`


export default styled.button`
${props => buttonVariant({ ...props.theme.button, ...props })}
`