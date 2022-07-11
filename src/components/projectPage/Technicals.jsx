import React from 'react'
import { Draggable } from "react-beautiful-dnd";

export const Technicals = ({technical, index}) => {


  return (
    <Draggable draggableId={technical.id} index={index}>
      {(provided) =>
      <div className='div-technical-container'
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}

      >
        {index === 0 && (
              <p className="p-leader-group">
                Team Leader
                </p>
           )}
        {technical.name}
      </div>
      
      }

    </Draggable>
  )
}
