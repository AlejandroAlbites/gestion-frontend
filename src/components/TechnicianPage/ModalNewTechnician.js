import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import '../../assets/styles/components/LandingPage/RegisterForm.scss';
import {
  createTechnicianAction,
  getTechniciansAction,
} from '../../store/actions/actionsTechnician';

export const ModalNewTechnician = ({ setOpened }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { name, lastName, role, dni, co, ve, li, so, re } = data;
    const conocimiento = co * 1;
    const velocidad = ve * 1;
    const liderazgo = li * 1;
    const sociabilidad = so * 1;
    const responsabilidad = re * 1;
    const statistics = [
      conocimiento,
      velocidad,
      liderazgo,
      sociabilidad,
      responsabilidad,
    ];

    console.log(statistics);
    dispatch(createTechnicianAction({ name, lastName, role, dni, statistics }));
    dispatch(getTechniciansAction());

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
          DNI o Cedula
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
        <p>Califica los siguientes datos en un rango de 1 a 99</p>
        <label htmlFor="fullName" className="mainForm__form-label">
          Conocimento
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="co"
          id="co"
          {...register('co', {
            required: true,
            pattern: /^(\d{2})$/,
          })}
        />
        {errors.co?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.co?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca número en un rago de 1 a 99
          </p>
        )}
        <label htmlFor="fullName" className="mainForm__form-label">
          Velocidad
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="ve"
          id="ve"
          {...register('ve', {
            required: true,
            pattern: /^(\d{2})$/,
          })}
        />
        {errors.ve?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.ve?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca número en un rago de 1 a 99
          </p>
        )}
        <label htmlFor="fullName" className="mainForm__form-label">
          Liderazgo
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="li"
          id="li"
          {...register('li', {
            required: true,
            pattern: /^(\d{2})$/,
          })}
        />
        {errors.li?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.li?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca número en un rago de 1 a 99
          </p>
        )}
        <label htmlFor="fullName" className="mainForm__form-label">
          Sociabilidad
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="so"
          id="so"
          {...register('so', {
            required: true,
            pattern: /^(\d{2})$/,
          })}
        />
        {errors.so?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.so?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca número en un rago de 1 a 99
          </p>
        )}
        <label htmlFor="fullName" className="mainForm__form-label">
          Responsabilidad
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="re"
          id="re"
          {...register('re', {
            required: true,
            pattern: /^(\d{2})$/,
          })}
        />
        {errors.re?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.re?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca número en un rago de 1 a 99
          </p>
        )}

        <input
          data-cy="register-click-event"
          type="submit"
          value="Crear Personal"
          className="button-form-login-register"
        />
      </form>
    </main>
  );
};
