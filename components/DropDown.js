import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Panel = styled(({ value, children, ...props }) => (
<div {...props}>
  {value && value.children}
  {children}
</div>
))``

const Caret = styled.div`
position: absolute;
top: 50%;
right: 20px;
display: inline-block;
width: 0;
height: 0;
transform: translateY(-50%);

${props => {
  if (props.direction === 'top') return `
    border-right: 3px solid transparent;
    border-bottom: 4px solid ${props.theme.font.color.index};
    border-left: 3px solid transparent;
  `
  if (props.direction === 'bottom') return `
    border-top: 4px solid ${props.theme.font.color.index};
    border-right: 3px solid transparent;
    border-left: 3px solid transparent;
  `
}}

&:hover, &:focus {
  cursor: pointer;
}
`

const List = styled.ul`
position: absolute;
z-index: 99999;
width: 100%;
min-width: 50px;
max-height: 260px;
margin: 5px 0 0;
padding: 15px 0;
overflow-x: hidden;
overflow-y: auto;
list-style: none;
background: ${props => props.theme.background.inner};
background-clip: padding-box;
border-radius: 4px;
box-shadow: ${props => props.theme.border.shadow.hover};
`
const Item = styled.li`
position: relative;
box-sizing: border-box;
padding: 5px 20px;
overflow: hidden;
font-weight: 600;
font-size: 13px;
line-height: 18px;
color: ${props => props.theme.font.color.index};
letter-spacing: .3px;
white-space: nowrap;
text-overflow: ellipsis;
cursor: pointer;
`
const Drop = styled.div`
position: relative;
${props => props.disabled ? 'opacity: 0.7' : ''};
${Panel} {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 12px 41px 12px 15px;
  overflow: hidden;
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.font.color.index};
  letter-spacing: 0.4px;
  text-overflow: ellipsis;
  background: ${props => props.theme.background.inner};
  border: 1px solid $color-border;
  border-radius: 4px;
  cursor: pointer;

  ${props => {
    if (props.value) return `
    color: ${props.theme.font.color.index}
    letter-spacing: 0.3px;
    `
  }}

  ${props => {
    if (props.disabled) return `
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      display: inline-block;
      background: ${props => props.theme.background.index};
      opacity: .6;
    }
    `
  }}
  ${props => {
    if (props.readOnly) return `
    text-overflow: ellipsis;
    background: ${props => props.theme.background.index};
    `
  }}
}
${List} {
  ${props => `display: ${props.opened ? 'block' : 'none'}`}
}
`
const DropDown = (props) => {
  const [ opened, setOpened ] = React.useState(false)
  const [ selected, setSelected ] = React.useState(props.value)
  const [ position, setPosition ] = React.useState(null)

  // React.useEffect(() => {
  //   document.addEventListener('click', handleDocumentClick)
  //   return () => { document.removeEventListener('click', handleDocumentClick) }
  // })

  // const handleDocumentClick = (e) => {
  //   if (props.disabled && !opened) return null
  //   const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn))
  //   const $parent = findDOMNode(this)
  //   const opened = closest(e.target, el => el === $parent)
  //   return !opened && setOpened(opened)
  // }

  const handleItemClick = ({ key, readOnly }, position = null) => {
    if (typeof key === 'undefined' || readOnly) return null
    setSelected(key)
    setPosition(position)
    setOpened(false)
    props.onChange(key)
  }


  const handleKeyDown = (e) => {
    const len = list.length
    // if (position === null && typeof selected !== 'undefined') {
    //   position = list.findIndex(item => item.key === selected)
    // }

    // const scroll = (pos) => {
    //   const parent = this.$list.getBoundingClientRect()
    //   const element = this.$items[pos].getBoundingClientRect()
    //   if (parent.bottom < element.bottom) return this.$list.scrollBy(0, element.bottom - parent.bottom)
    //   if (parent.top > element.top) return this.$list.scrollBy(0, element.top - parent.top)
    // }
    // switch (e.key) {
    //   case 'ArrowUp': position = (position === null) ? len - 1 : (position + len - 1) % len scroll(position) e.preventDefault() break
    //   case 'ArrowDown': position = (position === null) ? 0 : (position + 1) % len scroll(position) e.preventDefault() break
    //   case 'Tab': return this.handleToggle(false)
    //   case 'Enter': if (position !== null) this.handleItemClick(list[position], true) break
    //   case 'Escape': this.handleToggle(false) return this.$input.blur()
    //   default: return null
    // }
    // return this.setState({ position })
  }

  const value = props.list.find(i => +i.key === +selected)
  return (
    <Drop className={props.className} disabled={props.disabled} opened={opened} onKeyDown={handleKeyDown}>
      <Panel onClick={() => !props.disabled && setOpened(!opened)} value={value} placeholder={props.placeholder}>
        <Caret direction={opened ? 'top' : 'bottom'} />
      </Panel>

      <List>
        {
          props.list.filter(i => !props.hidden.includes(i.key)).map((i, index) => (
            <Item
              key={i.key}
              readOnly={i.readOnly}
              selected={position === index}
              onClick={() => handleItemClick(i, index)}
              onMouseOver={() => position === null && setPosition(index)}
            >
              {i.children}
            </Item>
          ))
        }
      </List>
    </Drop>
  )
}

DropDown.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, children: PropTypes.any })),
  hidden: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  cleaning: PropTypes.bool,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
}

DropDown.defaultProps = {
  list: [],
  hidden: [],
  cleaning: false,
}

export default styled(DropDown)``
