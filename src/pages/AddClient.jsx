import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar/navbar';
import '../styles/addClient.css';

const validationSchema = Yup.object({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'Mínimo 3 caracteres'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  telefono: Yup.string()
    .required('El teléfono es requerido')
    .matches(/^310\d{7}$/, 'Formato: 3101234567'),
  direccion: Yup.string()
    .required('La dirección es requerida'),
  preferencias: Yup.string()
    .required('Las preferencias son requeridas'),
  platillosFavoritos: Yup.string()
    .required('Seleccione un platillo')
});

const AddClient = () => {
  const navigate = useNavigate();
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    const fetchPlatillos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/platillo');
        setPlatillos(response.data);
      } catch (error) {
        console.error('Error fetching platillos:', error);
      }
    };
    fetchPlatillos();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const clienteData = {
        id: Math.random().toString(36).substr(2, 9), // Generar ID aleatorio
        nombre: values.nombre,
        email: values.email,
        telefono: values.telefono,
        direccion: values.direccion,
        preferencias: values.preferencias,
        restaurantesFavoritos: [],
        platillosFavoritos: values.platillosFavoritos ? [values.platillosFavoritos] : []
      };

      await axios.post('http://localhost:8080/consumidor', clienteData);
      alert('Cliente registrado exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar el cliente');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="form-container-client">
          <div className="form-header-client">
            <h2>Registro de Cliente</h2>
            <p>Complete su información personal</p>
          </div>

          <Formik
            initialValues={{
              nombre: '',
              email: '',
              telefono: '',
              direccion: '',
              preferencias: '',
              platillosFavoritos: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="client-form">
                <div className="form-grid-client">
                  <div className="form-group-client">
                    <label htmlFor="nombre">Nombre Completo*</label>
                    <Field
                      type="text"
                      name="nombre"
                      placeholder="Juan Pérez"
                    />
                    <ErrorMessage name="nombre" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="email">Email*</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="juan@ejemplo.com"
                    />
                    <ErrorMessage name="email" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="telefono">Teléfono*</label>
                    <Field
                      type="text"
                      name="telefono"
                      placeholder="3101234567"
                    />
                    <ErrorMessage name="telefono" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="direccion">Dirección*</label>
                    <Field
                      type="text"
                      name="direccion"
                      placeholder="Calle 123"
                    />
                    <ErrorMessage name="direccion" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="preferencias">Preferencias*</label>
                    <Field
                      type="text"
                      name="preferencias"
                      placeholder="Vegetariano"
                    />
                    <ErrorMessage name="preferencias" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="platillosFavoritos">Platillo Favorito*</label>
                    <Field
                      as="select"
                      name="platillosFavoritos"
                      className="platillos-select"
                    >
                      <option value="">Seleccione un platillo</option>
                      {platillos.map(platillo => (
                        <option key={platillo.id} value={platillo.id}>
                          {platillo.nombre}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="platillosFavoritos" component="span" className="error-text" />
                  </div>
                </div>

                <div className="form-actions-client">
                  <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button-client" disabled={isSubmitting}>
                    {isSubmitting ? 'Registrando...' : 'Registrar Cliente'}
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

export default AddClient;
