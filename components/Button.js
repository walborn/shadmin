import styled from 'styled-components'

const buttonVariant = ({ color, background, border, disabled }) => `
color: ${color.index};
background: ${background.index};
border: ${border.index};
border-radius: ${border.radius};
transition: background .1s ease-in-out;
line-height: 30px;
font-size: inherit;
${disabled
  ? `
cursor: default;
opacity: .5;
pointer-events: none;`
  : `
cursor: pointer;
&:focus, &:hover {
  background: ${background.hover};
  border: ${border.hover};
  color: ${color.hover};
  outline: none;
}`
}`


export default styled.button`
${props => buttonVariant({ ...props.theme.button, ...props })}
`