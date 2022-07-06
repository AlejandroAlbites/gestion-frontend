import React from 'react'
import { Task } from '../curso/Task'
import { Droppable, Draggable } from "react-beautiful-dnd";

export const Column = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) =>( 
         <div  className="div-container-columns"
         {...provided.draggableProps}
      
         ref={provided.innerRef}
         >
         <h2 {...provided.dragHandleProps}>{props.column.title}</h2>
         <Droppable droppableId={props.column.id} type='task'>
           { (provided)=> 
              <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              >
                {props.tasks.map( (task, index) => <Task key={task.id} task={task} index={index}/>)}
                {provided.placeholder}
              </div>
           }
          
         </Droppable>
   
       </div>
      )}

    </Draggable>
   
  )
}
