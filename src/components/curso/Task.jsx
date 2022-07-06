import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";

export const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) =>
      <div className='div-task-container'
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      >{props.task.content}</div>
      
      }

    </Draggable>
  )
}
