import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import '../../assets/styles/components/HomePage/ModalEditUser.scss';
import {
  updateImageAction,
  updateUserProfileAction,
} from '../../store/actions/actionsAuth';

export const ModalEditUser = ({ setOpened }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const { imageProfile } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
      dispatch(updateImageAction(file));
    }
  }, [file, dispatch]);

  const handleUpdateImageProfile = () => {
    document.querySelector('#imageSelector').click();
  };
  const handleChangeSelectImage = (e) => {
    setFile(e.target.files[0]);
  };

  const { user } = useSelector((state) => state.authReducer);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: user.name,
      company: user.company,
    },
  });

  const onSubmit = async (data) => {
    try {
      let userUpdated;
      if (imageProfile) {
        userUpdated = { ...user, ...data, image: imageProfile };
      } else {
        userUpdated = { ...user, ...data };
      }
      await dispatch(updateUserProfileAction(userUpdated));
      toast.info('Perfil Actualizado', {
        position: 'top-center',
        theme: 'colored',
      });
      setOpened(false);
    } catch (err) {
      console.log(err);
      toast.error('Ocurrio un Error, contacta con el administrador', {
        position: 'top-center',
        theme: 'colored',
      });
    }
  };
  return (
    <form className="modal-user-edit" onSubmit={handleSubmit(onSubmit)}>
      <div className="container-edit-input">
        <h1>
          Edita tu perfil, personaliza tu entorno de trabajo agregando el logo
          de la empresa
        </h1>
        <div className="container-input containerA">
          <div className="div-data-edit-container">
            <label htmlFor="name">Nombre</label>
            <input
              className="mainForm__form-input"
              type="text"
              name="name"
              id="name"
              placeholder="Ingresa un nuevo nombre"
              {...register('name', {
                required: true,
                pattern: /^[a-z\d A-Z\d]{4,30}$/i,
              })}
            />
            {errors.name?.type === 'required' && (
              <p className="input__error">⚠ El campo nombre es requerido</p>
            )}
            {errors.name?.type === 'pattern' && (
              <p className="input__error">
                ⚠ Enter full Name of minimum 4 characters and maximum 30
              </p>
            )}
          </div>
          <div className="div-data-edit-container">
            <label htmlFor="company">Empresa</label>
            <input
              className="mainForm__form-input"
              type="text"
              name="company"
              id="company"
              placeholder="Ingresa un nuevo nombre para tu empresa"
              {...register('company', {
                required: true,
                pattern: /^[a-z\d A-Z\d]{3,30}$/i,
              })}
            />
            {errors.name?.type === 'required' && (
              <p className="input__error">⚠ El campo empresa es requerido</p>
            )}
            {errors.company?.type === 'pattern' && (
              <p className="input__error">
                ⚠ Enter company of minimum 4 characters and maximum 30
              </p>
            )}
          </div>
        </div>

        <div className="container-submit-image">
          <div>
            <div className="show-image-profile">
              <span
                type="button"
                className="span__button-upload"
                onClick={handleUpdateImageProfile}>
                Cambiar Imagen
              </span>

              <img
                className="img__upload-image"
                src={user.image}
                alt="edit you profile"
                loading="lazy"
              />
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
              <div className="div__preview-image">
                <p>Vista previa</p>
                <img src={image} alt="upload preview" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="button-footer">
        {image && imageProfile ? (
          <button type="submit" className="button-save">
            Guardar Cambios
          </button>
        ) : image && !imageProfile ? (
          <p className="button-nosave">Guardar Cambios</p>
        ) : (
          <button type="submit" className="button-save">
            Guardar Cambios
          </button>
        )}
      </footer>
      <ToastContainer />
    </form>
  );
};
