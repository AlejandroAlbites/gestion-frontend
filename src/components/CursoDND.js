import React, { memo, PureComponent, useState } from "react";
import initialData from "../components/curso/initial-data";
import { Column } from "./curso/Column";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../assets/components/CursoDND.scss";

const InnerList = memo((props) => {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
});

export const CursoDND = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setState({
        ...state,
        columnOrder: newColumnOrder,
      });
    }

    const columnStart = state.columns[source.droppableId];
    const columnFinish = state.columns[destination.droppableId];

    if (columnStart === columnFinish) {
      const newTaskId = Array.from(columnStart.taskIds);
      newTaskId.splice(source.index, 1);
      newTaskId.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...columnStart,
        taskIds: newTaskId,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const startNewTaskId = Array.from(columnStart.taskIds);
    startNewTaskId.splice(source.index, 1);
    const newStart = {
      ...columnStart,
      taskIds: startNewTaskId,
    };

    const finishNewTaskId = Array.from(columnFinish.taskIds);
    finishNewTaskId.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...columnFinish,
      taskIds: finishNewTaskId,
    };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => {
          return (
            <div
              className="div-groups-container-columns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    taskMap={state.tasks}
                    index={index}
                  />
                );
                // const tasks = column.taskIds.map(
                //   (taskId) => state.tasks[taskId]
                // );

                // return (
                //   <Column
                //     key={column.id}
                //     column={column}
                //     tasks={tasks}
                //     index={index}
                //   />
                // );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
