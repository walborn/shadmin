import styled from 'styled-components'
import Input from './Input'

export default styled(({ className, ...props }) => (
  <div className={className}>
    <Input {...props} />
    <div>min</div>
  </div>
))`
position: relative;
> div {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  color: ${props => props.theme.border.color};
}
`
