import styled from 'styled-components'

const ResizableTextarea = (props) => {
  const [ rows, setRows ] = React.useState(props.rows)
  const [ value, setValue ] = React.useState(props.value)
  
  const $self = React.useRef()
  React.useEffect(() => {
    const lineHeight = 24

    const prevRows = $self.current.rows
    $self.current.rows = 1

    const nextRows = ($self.current.scrollHeight / lineHeight | 0) - 1

    if (nextRows === prevRows) $self.current.rows = nextRows
    setRows(nextRows)
  }, [])
  const handleChange = (event) => {
    const lineHeight = 24

    const prevRows = event.target.rows
    event.target.rows = 1

    const nextRows = (event.target.scrollHeight / lineHeight | 0) - 1

    if (nextRows === prevRows) event.target.rows = nextRows
    setValue(event.target.value)
    setRows(nextRows)
  }

  return (
    <textarea
      ref={$self}
      className={props.className}
      rows={rows}
      value={value}
      placeholder="Enter your text here..."
      onChange={handleChange}
    />
  )
}

export default styled(ResizableTextarea)`
position: relative;
width: 100%;
padding: 12px 25px 12px 15px;
border: 1px solid ${props => props.theme.border.color};
transition: border-color 0.2s ease-in-out;
border-radius: 4px;
outline: none;
font-size: inherit;
box-sizing: border-box;
line-height: 24px;
resize: none;
:focus {
  border-color: #73a9eb;
}

::placeholder {
  color: #95a3b4;
}`
