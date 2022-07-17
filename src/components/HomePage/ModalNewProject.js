import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import '../../assets/styles/components/LandingPage/RegisterForm.scss';
import {
  createProjectAction,
  getProjectsAction,
} from '../../store/actions/actionsProject';
export const ModalNewProject = ({ setOpened }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { name } = data;
    dispatch(createProjectAction({ name }));
    dispatch(getProjectsAction());
    setOpened(false);
  };
  return (
    <main className="mainForm">
      <form className="mainForm__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fullName" className="mainForm__form-label">
          Nombra tu proyecto
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="name"
          id="name"
          placeholder="Ingresa el nombre de tu proyecto"
          {...register('name', {
            required: true,
            pattern: /^[a-z\d A-Z\d]{6,30}$/i,
          })}
        />
        {errors.name?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.name?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca un nombre con un mínimo de 6 caracteres y un máximo de
            30
          </p>
        )}

        <input
          data-cy="register-click-event"
          type="submit"
          value="Crear Proyecto"
          className="button-form-login-register"
        />
      </form>
    </main>
  );
};
