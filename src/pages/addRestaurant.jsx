import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import '../styles/addRestaurant.css';

const validationSchema = Yup.object({
  nit: Yup.string()
    .required('NIT es requerido')
    .matches(/^\d{9}-\d$/, 'Formato inválido. Ej: 900123456-7'),
  nombre: Yup.string()
    .required('Nombre es requerido')
    .min(3, 'Mínimo 3 caracteres'),
  direccion: Yup.string()
    .required('Dirección es requerida'),
  telefono: Yup.string()
    .required('Teléfono es requerido')
    .matches(/^310\d{7}$/, 'Debe ser un número de 10 dígitos comenzando con 310'),
  whatsapp: Yup.string()
    .required('WhatsApp es requerido')
    .matches(/^310\d{7}$/, 'Debe ser un número de 10 dígitos comenzando con 310'),
  categoria: Yup.string()
    .required('Categoría es requerida')
    .oneOf(['ITALIANA', 'MEXICANA', 'CHINA', 'RAPIDA'], 'Categoría inválida'),
  imagen: Yup.string()
    .url('Debe ser una URL válida'),
  descripcion: Yup.string()
    .required('Descripción es requerida')
    .min(10, 'Mínimo 10 caracteres')
});

const AddRestaurant = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8080/restaurante', values);
      if (response.status === 201 || response.status === 200) {
        alert('Restaurante agregado exitosamente');
        navigate(-1);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar el restaurante');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="form-container-restaurant">
          <div className="form-header-restaurant">
            <h2>Agregar Restaurante</h2>
            <p>Complete la información de su restaurante</p>
          </div>

          <Formik
            initialValues={{
              nit: '',
              nombre: '',
              direccion: '',
              telefono: '',
              whatsapp: '',
              categoria: '',
              imagen: '',
              descripcion: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="restaurant-form">
                <div className="form-grid-restaurant">
                  {/* Campos básicos */}
                  <div className="form-group-restaurant">
                    <label htmlFor="nit">NIT*</label>
                    <Field
                      type="text"
                      name="nit"
                      placeholder="900123456-7"
                    />
                    <ErrorMessage name="nit" component="span" className="error-text" />
                  </div>

                  <div className="form-group-restaurant">
                    <label htmlFor="nombre">Nombre*</label>
                    <Field
                      type="text"
                      name="nombre"
                      placeholder="Restaurante Ejemplo"
                    />
                    <ErrorMessage name="nombre" component="span" className="error-text" />
                  </div>

                  <div className="form-group-restaurant">
                    <label htmlFor="telefono">Teléfono*</label>
                    <Field
                      type="text"
                      name="telefono"
                      placeholder="3101234567"
                    />
                    <ErrorMessage name="telefono" component="span" className="error-text" />
                  </div>

                  <div className="form-group-restaurant">
                    <label htmlFor="whatsapp">WhatsApp*</label>
                    <Field
                      type="text"
                      name="whatsapp"
                      placeholder="3101234567"
                    />
                    <ErrorMessage name="whatsapp" component="span" className="error-text" />
                  </div>

                  <div className="form-group-restaurant">
                    <label htmlFor="categoria">Categoría*</label>
                    <Field
                      type="text"
                      name="categoria"
                      placeholder="Ej: ITALIANA"
                      list="categorias"
                    />
                    <datalist id="categorias">
                      <option value="ITALIANA" />
                      <option value="MEXICANA" />
                      <option value="CHINA" />
                      <option value="RAPIDA" />
                    </datalist>
                    <ErrorMessage name="categoria" component="span" className="error-text" />
                  </div>

                  <div className="form-group-restaurant">
                    <label htmlFor="imagen">URL de la Imagen</label>
                    <Field
                      type="text"
                      name="imagen"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    <ErrorMessage name="imagen" component="span" className="error-text" />
                  </div>

                  <div className="form-group-restaurant full-width">
                    <label htmlFor="direccion">Dirección*</label>
                    <Field
                      type="text"
                      name="direccion"
                      placeholder="Calle 123 #45-67"
                    />
                    <ErrorMessage name="direccion" component="span" className="error-text" />
                  </div>

                  <div className="form-group-restaurant full-width">
                    <label htmlFor="descripcion">Descripción*</label>
                    <Field
                      as="textarea"
                      name="descripcion"
                      placeholder="Describe tu restaurante..."
                      rows="3"
                    />
                    <ErrorMessage name="descripcion" component="span" className="error-text" />
                  </div>
                </div>

                <div className="form-actions-restaurant">
                  <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button-restaurant" disabled={isSubmitting}>
                    {isSubmitting ? 'Agregando...' : 'Agregar Restaurante'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddRestaurant;
