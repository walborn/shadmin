import React from 'react'
import { DropTarget } from 'react-dnd'

const Desk = ({ accepts, isOver, connectDropTarget, children, active, className,...props }) => connectDropTarget(
  <div {...props } className={`${className}${isOver ? ' overlapped' : ''}`}>
      {children}
  </div>
)

export default DropTarget(props => props.accepts,
  { drop(props, monitor) { props.onDrop(monitor.getItem())  } },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(Desk)