import React from 'react'
import { Technicals } from './Technicals'
import { Droppable, Draggable } from "react-beautiful-dnd";

export const Groups = ({group, technicals, index}) => {

  const isDragDisabled = group.id === 'group-1';
  return (
    <Draggable draggableId={group.id} index={index} isDragDisabled={isDragDisabled}>
      {(provided) =>( 
         <div  
 
        className={ index === 0  ? 'div-group-technicals-list' : 'div-container-group'}
         {...provided.draggableProps}
         ref={provided.innerRef}
         >
         <h2 {...provided.dragHandleProps}>{group.title}</h2>
         <Droppable droppableId={group.id} type='technical'>
           { (provided)=> 
              <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              >
                {technicals.map( (technical, index) => <Technicals key={technical.id} technical={technical} index={index} />)}
                {provided.placeholder}
              </div>
           }
          
         </Droppable>
   
       </div>
      )}

    </Draggable>
   
  )
}
