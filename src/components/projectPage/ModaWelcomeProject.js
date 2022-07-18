import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../assets/styles/components/LandingPage/RegisterForm.scss';
import { createFirstGroupAction } from '../../store/actions/actionsGroup';
export const ModaWelcomeProject = ({ setOpenedWelcomeProject }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { name, description } = data;
    dispatch(createFirstGroupAction({ name, description, id }));
    setOpenedWelcomeProject(false);
  };
  return (
    <div>
      <p>
        Antes de iniciar a trabajar en tu proyecto es necesario crear tu primer
        grupo de trabajo, este grupo no podrá ser enviado a ejecución ya que
        funcionará como una banca de suplentes donde se añadirán inicialmente
        los técnicos.
      </p>
      <form className="mainForm__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fullName" className="mainForm__form-label">
          Nombre del grupo
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombres sugeridos: lista de personal, banca, suplentes"
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
          className="mainForm__form-input"
          type="text"
          name="description"
          id="description"
          placeholder="Ingresa una breve descripción"
          {...register('description', {
            required: true,
            pattern: /^[a-z\d A-Z\d]{6,30}$/i,
          })}
        />
        {errors.description?.type === 'required' && (
          <p className="input__error">⚠ El campo es requerido</p>
        )}
        {errors.description?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca un nombre con un mínimo de 6 caracteres y un máximo de
            30
          </p>
        )}

        <input
          type="submit"
          value="Crear Grupo"
          className="button-form-login-register"
        />
      </form>
    </div>
  );
};
