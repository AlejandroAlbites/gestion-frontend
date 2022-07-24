import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../assets/styles/components/LandingPage/RegisterForm.scss';
import {
  clearCurrentImage,
  createTechnicianAction,
  getTechniciansAction,
  newImagenTechnician,
} from '../../store/actions/actionsTechnician';
import { useSelector } from 'react-redux';

export const ModalNewTechnician = ({ setOpened }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const { technicianImage } = useSelector((state) => state.technicianReducer);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
      dispatch(newImagenTechnician(file));
    }
  }, [file]);

  const handleUpdateImageProfile = () => {
    document.querySelector('#imageSelector').click();
  };
  const handleChangeSelectImage = (e) => {
    setFile(e.target.files[0]);
  };

  const dispatch = useDispatch();
  const [co, setCo] = useState(50);
  const [ve, setVe] = useState(50);
  const [li, setLi] = useState(50);
  const [so, setSo] = useState(50);
  const [re, setRe] = useState(50);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { name, lastName, role, dni } = data;
    const conocimiento = co;
    const velocidad = ve;
    const liderazgo = li;
    const sociabilidad = so;
    const responsabilidad = re;
    const statistics = [
      conocimiento,
      velocidad,
      liderazgo,
      sociabilidad,
      responsabilidad,
    ];

    let newTechnician;
    if (technicianImage) {
      newTechnician = {
        name,
        lastName,
        role,
        dni,
        statistics,
        technicianImage,
      };
    } else {
      newTechnician = { name, lastName, role, dni, statistics };
    }

    dispatch(createTechnicianAction(newTechnician));
    dispatch(clearCurrentImage());
    setOpened(false);
  };
  return (
    <main className="mainForm">
      <form className="mainForm__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fullName" className="mainForm__form-label">
          Nombres
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="name"
          id="name"
          placeholder="Ingresa el nombre"
          {...register('name', {
            required: true,
            pattern: /^[a-z\d A-Z\d]{4,20}$/i,
          })}
        />
        {errors.name?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.name?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca un nombre con un mínimo de 4 caracteres y un máximo de
            20
          </p>
        )}
        <label htmlFor="fullName" className="mainForm__form-label">
          Apellidos
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Ingresa el apellido"
          {...register('lastName', {
            required: true,
            pattern: /^[a-z\d A-Z\d]{4,30}$/i,
          })}
        />
        {errors.lastName?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.lastName?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca un apellido con un mínimo de 4 caracteres y un máximo
            de 30
          </p>
        )}
        <label htmlFor="fullName" className="mainForm__form-label">
          Documento de Identidad
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="dni"
          id="dni"
          placeholder="Ingresa el número de DNI o Cedula"
          {...register('dni', {
            required: true,
            pattern: /^[a-z\d A-Z\d]{8,10}$/i,
          })}
        />
        {errors.dni?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.dni?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca un DNI o Cedula con un mínimo de 8 números y un máximo
            de 10
          </p>
        )}
        <label htmlFor="fullName" className="mainForm__form-label">
          Puesto
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="role"
          id="role"
          placeholder="Ingresa el cargo del trabajador"
          {...register('role', {
            required: true,
            pattern: /^[a-z\d A-Z\d]{4,30}$/i,
          })}
        />
        {errors.role?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.role?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca un cargo de trabajo con un mínimo de 4 números y un
            máximo de 30
          </p>
        )}
        <br />
        <p>Califica los siguientes datos en un rango de 0 a 100</p>

        <p className="mainForm__form-label">Conocimento</p>
        <div className="mainForm__rf-slider">
          <div className="div-slider-container">
            <Slider defaultValue={50} onChange={(val) => setCo(val)} />
          </div>
          <p>{co}</p>
        </div>
        <p className="mainForm__form-label">Velocidad</p>
        <div className="mainForm__rf-slider">
          <div className="div-slider-container">
            <Slider defaultValue={50} onChange={(val) => setVe(val)} />
          </div>
          <p>{ve}</p>
        </div>
        <p className="mainForm__form-label">Liderazgo</p>
        <div className="mainForm__rf-slider">
          <div className="div-slider-container">
            <Slider defaultValue={50} onChange={(val) => setLi(val)} />
          </div>
          <p>{li}</p>
        </div>
        <p className="mainForm__form-label">Sociabilidad</p>
        <div className="mainForm__rf-slider">
          <div className="div-slider-container">
            <Slider defaultValue={50} onChange={(val) => setSo(val)} />
          </div>
          <p>{so}</p>
        </div>
        <p className="mainForm__form-label">Responsabilidad</p>
        <div className="mainForm__rf-slider">
          <div className="div-slider-container">
            <Slider defaultValue={50} onChange={(val) => setRe(val)} />
          </div>
          <p>{re}</p>
        </div>

        <div className="container-submit-image-technician">
          <div className="technician-image-upload">
            <div className="show-image-profile">
              <span
                type="button"
                className="span__button-upload-technician"
                onClick={handleUpdateImageProfile}>
                Subir Foto
              </span>
            </div>
            <div className="button-edit">
              <input
                id="imageSelector"
                type="file"
                name="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleChangeSelectImage}
              />
            </div>
          </div>
          <div>
            {' '}
            {!!image && (
              <div className="div__preview-image-technician">
                <p>Vista previa</p>
                <img src={image} alt="upload preview" loading="lazy" />
              </div>
            )}
          </div>
        </div>

        <footer className="button-footer">
          {image && technicianImage ? (
            <button type="submit" className="button-save">
              Crear Personal
            </button>
          ) : image && !technicianImage ? (
            <p className="button-nosave">Crear Personal</p>
          ) : (
            <button type="submit" className="button-save">
              Crear Personal
            </button>
          )}
        </footer>
      </form>
    </main>
  );
};
