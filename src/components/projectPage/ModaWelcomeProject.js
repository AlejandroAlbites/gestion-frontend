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
    const { name } = data;
    dispatch(createFirstGroupAction({ name, id }));
    setOpenedWelcomeProject(false);
  };
  return (
    <div>
      <p className="p-welcome-create-first-group">
        Antes de iniciar a trabajar en tu proyecto es necesario crear tu primer
        grupo de trabajo, este grupo no podrá ser enviado a ejecución ya que
        funcionará como una banca de suplentes donde se añadirán inicialmente
        los técnicos.
      </p>
      <form className="mainForm__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fullName" className="mainForm__form-label">
          Nombre del Grupo
        </label>
        <input
          className="mainForm__form-input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombres sugeridos: lista de personal, banca, suplentes"
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
        <input
          type="submit"
          value="Crear Grupo"
          className="button-form-login-register"
        />
      </form>
    </div>
  );
};
