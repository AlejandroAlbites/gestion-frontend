import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../assets/styles/components/LandingPage/RegisterForm.scss';
import {
  changePasswordAction,
  logoutUser,
} from '../../store/actions/actionsAuth';
export const ModalChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const passValidator = useSelector(
    (state) => state.authReducer.changePassword
  );

  const onSubmit = (data) => {
    const { oldPassword, password, repeatPassword } = data;

    dispatch(changePasswordAction({ oldPassword, password, repeatPassword }));
  };

  useEffect(() => {
    if (passValidator) {
      toast.success('Cambio exitoso, por seguridad será redirigido al inicio', {
        position: 'top-center',
        theme: 'colored',
      });

      dispatch(logoutUser());
      navigate('/');
    }
  }, [passValidator, dispatch, navigate]);

  return (
    <main className="mainForm">
      <form className="mainForm__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="oldPassword" className="mainForm__form-label">
          Contraseña Actual
        </label>
        <input
          className="mainForm__form-input"
          type="password"
          name="oldPassword"
          id="oldPassword"
          placeholder="Ingresa tu contraseña"
          {...register('oldPassword', {
            required: true,
            minLength: 8,
            pattern:
              /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          })}
        />
        {errors.oldPassword?.type === 'required' && (
          <p className="input__error" data-cy="error-password-input">
            ⚠ El campo contraseña es requerido
          </p>
        )}
        <label htmlFor="password" className="mainForm__form-label">
          Nueva Contraseña
        </label>
        <input
          data-cy="password"
          className="mainForm__form-input"
          type="password"
          name="password"
          id="password"
          placeholder="Ingresa tu nueva contraseña"
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
          value="Cambiar Contraseña"
          className="button-form-login-register"
        />
      </form>
    </main>
  );
};
