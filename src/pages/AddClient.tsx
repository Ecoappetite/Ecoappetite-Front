import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/navbar/Navbar';
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
    .matches(/^3\d{9}$/, 'Formato: 3'),
  direccion: Yup.string()
    .required('La dirección es requerida'),
  correo: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es requerido'),
  contrasena: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida')
});

const AddClient = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (
    values: {
      nombre: string;
      email: string;
      telefono: string;
      direccion: string;
      correo: string;
      contrasena: string;
    }, 
    { 
      setSubmitting, 
    }: {
      setSubmitting: (value: boolean) => void;
    }
  ) => {
    try {
      const clienteData = {
        id: Math.random().toString(36).substr(2, 9),
        nombre: values.nombre,
        email: values.email,
        telefono: values.telefono,
        direccion: values.direccion,

      };

      const usuarioData = {
        correo: values.correo,
        contrasena: values.contrasena,
        rol: "CONSUMIDOR"
      };

      const payload = {
        usuario: usuarioData,
        consumidor: clienteData,
      };

      console.log("Payload enviado:", payload);

      await axios.post('http://localhost:8080/registro/consumidor', payload,{ withCredentials: true });
      alert('Cliente registrado exitosamente');
      navigate('/login');
    } catch (error: any) {
      console.error('Error al registrar el cliente:', error.response);
      alert('Error al registrar el cliente: ${error.response?.data?.message || error.message}');
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

              correo: '',
              contrasena: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="client-form">
                <div className="form-grid-client">
                  <div className="form-group-client">
                    <label htmlFor="nombre">Nombre Completo*</label>
                    <Field type="text" name="nombre" placeholder="Juan Pérez" />
                    <ErrorMessage name="nombre" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="email">Email*</label>
                    <Field type="email" name="email" placeholder="juan@ejemplo.com" />
                    <ErrorMessage name="email" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="telefono">Teléfono*</label>
                    <Field type="text" name="telefono" placeholder="3101234567" />
                    <ErrorMessage name="telefono" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="direccion">Dirección*</label>
                    <Field type="text" name="direccion" placeholder="Calle 123" />
                    <ErrorMessage name="direccion" component="span" className="error-text" />
                  </div>



                  <div className="form-group-client">
                    <label htmlFor="correo">Correo del Usuario*</label>
                    <Field type="text" name="correo" placeholder="usuario@ejemplo.com" />
                    <ErrorMessage name="correo" component="span" className="error-text" />
                  </div>

                  <div className="form-group-client">
                    <label htmlFor="contrasena">Contraseña del Usuario*</label>
                    <div className="password-wrapper">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="contrasena"
                        placeholder="********"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="toggle-password"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <ErrorMessage name="contrasena" component="span" className="error-text" />
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