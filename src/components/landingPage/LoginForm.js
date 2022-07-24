import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import '../../assets/styles/components/LandingPage/RegisterForm.scss';
import { loginUserAction } from '../../store/actions/actionsAuth';
export const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    dispatch(loginUserAction({ email, password }));
  };
  return (
    <main className="mainForm">
      <form className="mainForm__form" onSubmit={handleSubmit(onSubmit)}>
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

        <input
          data-cy="register-click-event"
          type="submit"
          value="Iniciar Sesión"
          className="button-form-login-register"
        />
      </form>
    </main>
  );
};
