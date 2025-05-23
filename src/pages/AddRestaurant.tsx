import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Asegúrate de importar los iconos correctamente
import axios from 'axios'; // Asegúrate de importar axios
import Navbar from '../components/navbar/Navbar';
import '../styles/addRestaurant.css';

const validationSchema = Yup.object({
  nit: Yup.string()
    .required('NIT es requerido')
    .matches(/^\d{9}\d$/, 'Formato inválido. Ej: 900123456-7'),
  nombre: Yup.string()
    .required('Nombre es requerido')
    .min(3, 'Mínimo 3 caracteres'),
  direccion: Yup.string()
    .required('Dirección es requerida'),
  telefono: Yup.string()
    .required('Teléfono es requerido')
    .matches(/^3\d{9}$/, 'Debe ser un número de 10 dígitos comenzando con 310'),
  whatsapp: Yup.string()
    .required('WhatsApp es requerido')
    .matches(/^3\d{9}$/, 'Debe ser un número de 10 dígitos comenzando con 310'),
  categoria: Yup.string()
    .required('Categoría es requerida')
    .oneOf(['ITALIANA', 'MEXICANA', 'CHINA', 'RAPIDA'], 'Categoría inválida'),
  imagen: Yup.string()
    .url('Debe ser una URL válida'),
  descripcion: Yup.string()
    .required('Descripción es requerida')
    .min(10, 'Mínimo 10 caracteres'),
  correo: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es requerido'),
  contrasena: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida')
});

const AddRestaurant = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambiar entre mostrar/ocultar la contraseña
  };

  const handleSubmit = async (
    values: {
      nit: string;
      nombre: string;
      direccion: string;
      telefono: string;
      whatsapp: string;
      categoria: string;
      imagen: string;
      descripcion: string;
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
      const token = localStorage.getItem("token"); // Obtener el token JWT del localStorage

      // Si no hay token, redirigir al login
      if (!token) {
        alert("No se encontró el token de autenticación");
        navigate("/login");
        return;
      }

      const variable ={
          "usuario": {
              "correo": values.correo,
              "contrasena": values.contrasena
          },
          "restaurante":{
              "nit": values.nit,
              "nombre": values.nombre,
              "direccion": values.direccion,
              "telefono": values.telefono,
              "whatsapp": values.whatsapp,
              "categoria": values.categoria ,
              "imagen": values.imagen,
              "descripcion": values.descripcion
          }
      }

      // Enviar la solicitud POST al backend con el token en la cabecera Authorization
      const response = await axios.post(
        'http://localhost:8080/registro/restaurante', // URL del backend
        variable, // Los valores del formulario
        {
          headers: {
            'Authorization': `${token}`, // Incluir el token en la cabecera
          }
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert('Restaurante agregado exitosamente');
        navigate(-1); // Volver a la página anterior
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar el restaurante');
    } finally {
      setSubmitting(false); // Deshabilitar el botón de envío cuando la solicitud se complete
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
              descripcion: '',
              correo: '',
              contrasena: ''
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

                  {/* Campos de correo y contraseña */}
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