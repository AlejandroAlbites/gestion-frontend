import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import '../../assets/styles/components/LandingPage/RegisterForm.scss';
import { registerUserAction } from '../../store/actions/actionsAuth';
export const Registerform = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const onSubmit = (data) => {
    const { name, company, email, password } = data;

    dispatch(registerUserAction({ name, company, email, password }));
  };
  return (
    <main className="mainForm">
      <form className="mainForm__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fullName" className="mainForm__form-label">
          Nombre y Apellido
        </label>
        <input
          data-cy="full-name"
          className="mainForm__form-input"
          type="text"
          name="name"
          id="name"
          placeholder="Ingresa tu nombre y apellido"
          {...register('name', {
            required: true,
            pattern: /^[a-z\d A-Z\d]{4,30}$/i,
          })}
        />
        {errors.name?.type === 'required' && (
          <p className="input__error">
            ⚠ El campo de nombre y apellido es requerido
          </p>
        )}
        {errors.name?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca un nombre con un mínimo de 6 caracteres y un máximo de
            30
          </p>
        )}
        <label htmlFor="company" className="mainForm__form-label">
          Empresa
        </label>
        <input
          data-cy="company"
          className="mainForm__form-input"
          type="text"
          name="company"
          id="company"
          placeholder="Ingresa el nombre de tu empresa"
          {...register('company', {
            required: true,
            pattern: /^[a-z\d A-Z\d]{3,30}$/i,
          })}
        />
        {errors.company?.type === 'required' && (
          <p className="input__error">⚠ El campo de empresa es requerido</p>
        )}
        {errors.fullName?.type === 'pattern' && (
          <p className="input__error" data-cy="error-fullName-input">
            ⚠ Introduzca un nombre de empresa con un mínimo de 3 caracteres y un
            máximo de 30
          </p>
        )}

        <label htmlFor="email" className="mainForm__form-label">
          Correo
        </label>
        <input
          data-cy="email"
          className="mainForm__form-input"
          type="email"
          name="email"
          id="email"
          placeholder="Ingresa tu correo"
          {...register('email', {
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        {errors.email?.type === 'required' && (
          <p className="input__error" data-cy="error-email-input">
            ⚠ El campo correo es requerido
          </p>
        )}
        {errors.email?.type === 'pattern' && (
          <p className="input__error" data-cy="error-email-format-input">
            ⚠ El formato del correo no es el correcto
          </p>
        )}
        <label htmlFor="name" className="mainForm__form-label">
          Contraseña
        </label>
        <input
          data-cy="password"
          className="mainForm__form-input"
          type="password"
          name="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          {...register('password', {
            required: true,
            minLength: 8,
            pattern:
              /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          })}
        />
        {errors.password?.type === 'required' && (
          <p className="input__error" data-cy="error-password-input">
            ⚠ El campo contraseña es requerido
          </p>
        )}
        {errors.password?.type === 'minLength' && (
          <p className="input__error" data-cy="error-password-2-input">
            ⚠ La contraseña debe tener un mínimo de 8 caracteres
          </p>
        )}
        {errors.password?.type === 'pattern' && (
          <p className="input__error" data-cy="error-password-3-input">
            ⚠ La contraseña debe tener al menos una letra mayúscula, una letra
            minúscula, un número o carácter especial y una longitud mínimo de 8
            caracteres
          </p>
        )}
        <label htmlFor="repeatPassword" className="mainForm__form-label">
          Repite tu contraseña
        </label>
        <input
          className="mainForm__form-input"
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Ingresa tu contraseña nuevamente"
          {...register('repeatPassword', {
            validate: (value) =>
              value === password.current || '⚠ The passwords do not match',
            required: true,
          })}
        />
        {errors.repeatPassword && (
          <p className="input__error">{errors.repeatPassword.message}</p>
        )}
        {errors.repeatPassword?.type === 'required' && (
          <p className="input__error">
            ⚠ El campo repetir contraseña es requerido
          </p>
        )}

        <input
          data-cy="register-click-event"
          type="submit"
          value="Registrarse"
          className="button-form-login-register"
        />
      </form>
    </main>
  );
};
