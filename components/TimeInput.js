import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TimeSVG from '../public/time.svg'

const Time = styled.div`
position: relative;
> svg {
  position: absolute;
  top: 50%;
  right: 14px;
  width: 14px;
  height: 14px;
  transform: translateY(-50%);
  fill: ${props => props.theme.border.color};
}
`
const Input = styled.input`
position: relative;
padding: 12px 25px 12px 15px;
width: 100%;
border: 1px solid ${props => props.theme.border.color};
transition: border-color 0.2s ease-in-out;
border-radius: 4px;
outline: none;
font-size: inherit;
box-sizing: border-box;
:focus {
  border-color: #73a9eb;
}

::placeholder {
  color: #95a3b4;
}`

const minutes = function(props, propName, componentName) {
  const value = props[propName]
  if (typeof value !== 'string') return new Error(`Invalid TYPE of prop \`${propName}\` supplied to \`${componentName}\`. Validation failed. Value is ${value} [${typeof value}]`);
  if (!/^\d+&/.test(value)) return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value is not \\d+. Value is ${value} [${typeof value}]`);
  if (+value < 0 || +value > 1680) return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value is out of range. Value is ${value} [${typeof value}]`);
}
const timify = value => `${`0${+value / 60 | 0}`.slice(-2)}:${`0${+value % 60}`.slice(-2)}`
const getMinutes = value => (([ h, m ]) => `${h * 60 + m}`)(value);

const TimeInput = props => {
  const $input = React.useRef()
  const [ value, setValue ] = React.useState(timify(props.value))

  const parse = (v) => {
    if (typeof v !== 'string' || !v || !/^\d{0,2}:?\d{0,2}$/.test(v)) return []
    const normalize = ([ h, m ]) => [ Math.min(+h, 23),  Math.min(+m, 59) ]
    const [ a, b ] = (x => ~x ? [ x, x + 1 ] : [ 2, 2 ])(v.indexOf(':'))
    return normalize([ v.slice(0, a), v.slice(b)])
  }

  const handleBlur = () => {
    if (props.disabled) return
    const [ hours, minutes ] = parse(value)
    if (hours === undefined) return props.onChange({ target: { value: '' } })
    setValue(`${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}`)
    props.onChange({ target: { value: getMinutes([ hours, minutes ]) } })
  }

  const handleFocus = () => !props.disabled && $input.current.setSelectionRange(0, 5)

  const handleKeyDown = (e) => {
    if (props.readOnly) return
    if ([ 9/*tab*/, 37/*left*/, 39/*right*/ ].includes(e.keyCode)) return

    e.preventDefault();
    let { selectionStart } = $input.current
    const { selectionEnd } = $input.current

    // BACKSPACE
    if (e.keyCode === 8) {
      const nextValue = selectionStart === selectionEnd && selectionStart
        ? value.slice(0, --selectionStart) + value.slice(selectionEnd) // Убираем один символ перед кареткой
        : value.slice(0, selectionStart) + value.slice(selectionEnd); // Убираем интервал символов

      setValue(nextValue)
      $input.current.setSelectionRange(selectionStart, selectionStart)
      return
    }

    if ('1234567890:'.indexOf(e.key) === -1 || (~value.indexOf(':') && e.key === ':')) return

    const valueBegin = value.slice(0, selectionStart)
    const valueEnd = value.slice(selectionEnd + 1)
    let nextValue = `${valueBegin}${e.key}${valueEnd}`

    if (nextValue.length >= 3 && nextValue.indexOf(':') === -1) {
      nextValue = `${nextValue.slice(0, 2)}:${nextValue.slice(2)}`
      ++selectionStart
    }
    setValue(nextValue.slice(0, 5))
    $input.current.setSelectionRange(selectionStart + 1, selectionStart + 1)
  }

  return (
    <Time className={props.className}>
      <Input
        ref={$input}
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
        maxLength={5}
      />
      <TimeSVG />
    </Time>
  )
}

TimeInput.propTypes = {
  className: PropTypes.string,
  value: minutes.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default styled(TimeInput)``