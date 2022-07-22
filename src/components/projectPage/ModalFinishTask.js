import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../assets/styles/components/ProjectPage/ModalFinishTask.scss';
import { useDispatch } from 'react-redux';
import { updateGroupScore } from '../../store/actions/actionsGroup';

export const ModalFinishTask = ({ dragGroupId, setOpenedFinishTask }) => {
  const [value, setValue] = useState(50);
  const dispatch = useDispatch();

  const handleSaveScore = () => {
    dispatch(updateGroupScore(dragGroupId, value));

    setOpenedFinishTask(false);
  };
  return (
    <div>
      <h1>Califica el trabajo de este grupo en un rango de 0 a 100 puntos</h1>
      <h2 className="h2-title-score">{value}</h2>
      <Slider step={10} defaultValue={50} onChange={(val) => setValue(val)} />
      <button className="button-save-score" onClick={handleSaveScore}>
        Guardar puntuación
      </button>
    </div>
  );
};
