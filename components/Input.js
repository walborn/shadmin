import styled from 'styled-components'

export default styled(({ onChange, ...props }) => (
  <input {...props} onChange={(e) => (typeof onChange === 'function') && onChange(e.target.value, e.target.name)} />
))`
${props => props.disabled ? 'opacity: 0.7;' : ''}
position: relative;
width: 100%;
padding: 12px 25px 12px 15px;
border: 1px solid ${props => props.theme.border.color.index};
background: ${props => props.theme.background.default};
color: ${props => props.theme.font.color.disabled};
transition: border-color 0.2s ease-in-out;
border-radius: 4px;
outline: none;
font-size: inherit;
box-sizing: border-box;
:focus {
  border-color: ${props => props.theme.border.color.hover};
  color: ${props => props.theme.font.color.index};
}

::placeholder {
  color: ${props => props.theme.font.color.disabled};
}`
