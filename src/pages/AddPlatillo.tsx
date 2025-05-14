// src/pages/AddPlatillo.tsx
import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CakeIcon from '@mui/icons-material/Cake';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from '../components/navbar/navbar';
import '../styles/addPlatillo.css';

interface FormErrors {
  [key: string]: string;
}

const AddPlatillo = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [platillo, setPlatillo] = useState({
    nombre: '',
    precioOriginal: '',
    precioDescuento: '',
    categoriaPlatillo: 'ENTRADA',
    estadoPlatillo: 'DISPONIBLE',
    cantidadDisponible: '',
    imagen: '',
    descripcion: '',
    nitRestaurante: ''
  });

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!platillo.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }

    if (!platillo.precioOriginal) {
      errors.precioOriginal = 'El precio original es requerido';
    } else if (parseFloat(platillo.precioOriginal) <= 0) {
      errors.precioOriginal = 'El precio debe ser mayor a 0';
    }

    if (!platillo.precioDescuento) {
      errors.precioDescuento = 'El precio con descuento es requerido';
    } else if (parseFloat(platillo.precioDescuento) >= parseFloat(platillo.precioOriginal)) {
      errors.precioDescuento = 'El precio con descuento debe ser menor al precio original';
    }

    if (!platillo.cantidadDisponible) {
      errors.cantidadDisponible = 'La cantidad es requerida';
    } else if (parseInt(platillo.cantidadDisponible) <= 0) {
      errors.cantidadDisponible = 'La cantidad debe ser mayor a 0';
    }

    if (!platillo.descripcion.trim()) {
      errors.descripcion = 'La descripción es requerida';
    }

    if (!platillo.nitRestaurante.trim()) {
      errors.nitRestaurante = 'El NIT del restaurante es requerido';
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlatillo(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoriaSelect = (categoria: string) => {
    setPlatillo(prev => ({
      ...prev,
      categoriaPlatillo: categoria
    }));
  };

  const handleEstadoSelect = (estado: string) => {
    setPlatillo(prev => ({
      ...prev,
      estadoPlatillo: estado
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const platilloData = {
        nombre: platillo.nombre,
        precioOriginal: parseFloat(platillo.precioOriginal),
        precioDescuento: parseFloat(platillo.precioDescuento),
        categoriaPlatillo: platillo.categoriaPlatillo,
        estadoPlatillo: platillo.estadoPlatillo,
        cantidadDisponible: parseInt(platillo.cantidadDisponible),
        imagen: platillo.imagen,
        descripcion: platillo.descripcion
      };

      const token = localStorage.getItem('token');
      console.log("Token JWT (sin Bearer):", token);

      if (!token) {
        console.error("Token no encontrado en localStorage");
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (payload.exp < currentTimestamp) {
        console.error("El token ha expirado.");
        return;
      } else {
        console.log("El token es válido. Continuando con la solicitud.");
      }

      const config = {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.put(
        `http://localhost:8080/restaurante/${platillo.nitRestaurante}/platillo`,
        platilloData,
        config
      );

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setPlatillo({
            nombre: '',
            precioOriginal: '',
            precioDescuento: '',
            categoriaPlatillo: 'ENTRADA',
            estadoPlatillo: 'DISPONIBLE',
            cantidadDisponible: '',
            imagen: '',
            descripcion: '',
            nitRestaurante: ''
          });
          setShowSuccessMessage(false);
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error al enviar platillo:', error);
      setFormErrors({
        submit: error.response?.data?.message || 'Error al actualizar el platillo'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categorias = [
    { value: 'ENTRADA', icon: <RestaurantMenuIcon />, label: 'Entrada' },
    { value: 'PLATO_FUERTE', icon: <DinnerDiningIcon />, label: 'Plato Fuerte' },
    { value: 'COMIDA_RAPIDA', icon: <FastfoodIcon />, label: 'Comida Rápida' },
    { value: 'POSTRE', icon: <CakeIcon />, label: 'Postre' },
    { value: 'BEBIDA', icon: <LocalBarIcon />, label: 'Bebida' },
  ];

  const estados = [
    { value: 'DISPONIBLE', icon: <CheckCircleIcon />, label: 'Disponible' },
    { value: 'AGOTADO', icon: <CancelIcon />, label: 'Agotado' },
  ];

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="addPlatillo-container">
          <div className="form-header">
            <h2>Agregar Platillo</h2>
            <p>Complete todos los campos para registrar un nuevo platillo</p>
          </div>

          {showSuccessMessage && (
            <div className="success-message">
              ¡Platillo agregado exitosamente!
            </div>
          )}

          {formErrors.submit && (
            <div className="error-message">
              {formErrors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="addPlatillo-form">
            <div className="form-left-panel">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre del Platillo*</label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    placeholder="Ej: Ensalada César"
                    value={platillo.nombre}
                    onChange={handleChange}
                    className={formErrors.nombre ? 'error' : ''}
                  />
                  {formErrors.nombre && <span className="error-text">{formErrors.nombre}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="precioOriginal">Precio Original*</label>
                  <input
                    id="precioOriginal"
                    type="number"
                    name="precioOriginal"
                    placeholder="Ej: 25000"
                    value={platillo.precioOriginal}
                    onChange={handleChange}
                    className={formErrors.precioOriginal ? 'error' : ''}
                    min="0"
                    step="8000"
                  />
                  {formErrors.precioOriginal && <span className="error-text">{formErrors.precioOriginal}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="precioDescuento">Precio con Descuento*</label>
                  <input
                    id="precioDescuento"
                    type="number"
                    name="precioDescuento"
                    placeholder="Ej: 20000"
                    value={platillo.precioDescuento}
                    onChange={handleChange}
                    className={formErrors.precioDescuento ? 'error' : ''}
                    min="0"
                    step="5000"
                  />
                  {formErrors.precioDescuento && <span className="error-text">{formErrors.precioDescuento}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cantidadDisponible">Cantidad Disponible*</label>
                  <input
                    id="cantidadDisponible"
                    type="number"
                    name="cantidadDisponible"
                    placeholder="Ej: 10"
                    value={platillo.cantidadDisponible}
                    onChange={handleChange}
                    className={formErrors.cantidadDisponible ? 'error' : ''}
                    min="1"
                  />
                  {formErrors.cantidadDisponible && <span className="error-text">{formErrors.cantidadDisponible}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="nitRestaurante">NIT del Restaurante*</label>
                  <input
                    id="nitRestaurante"
                    type="text"
                    name="nitRestaurante"
                    placeholder="Ej: 900123456-7"
                    value={platillo.nitRestaurante}
                    onChange={handleChange}
                    className={formErrors.nitRestaurante ? 'error' : ''}
                  />
                  {formErrors.nitRestaurante && <span className="error-text">{formErrors.nitRestaurante}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="imagen">URL de la Imagen</label>
                  <input
                    id="imagen"
                    type="text"
                    name="imagen"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={platillo.imagen}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="descripcion">Descripción*</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Describe el platillo..."
                    value={platillo.descripcion}
                    onChange={handleChange}
                    className={formErrors.descripcion ? 'error' : ''}
                    rows={3}
                  />
                  {formErrors.descripcion && <span className="error-text">{formErrors.descripcion}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
                  Cancelar
                </button>
                <button type="submit" className="submit-button-platillo" disabled={isSubmitting}>
                  {isSubmitting ? 'Agregando...' : 'Agregar Platillo'}
                </button>
              </div>
            </div>

            <div className="form-right-panel">
              <div className="form-group">
                <label>Selecciona una Categoría</label>
                <div className="categorias">
                  {categorias.map((cat) => (
                    <div
                      key={cat.value}
                      className={`categoria ${platillo.categoriaPlatillo === cat.value ? 'selected' : ''}`}
                      onClick={() => handleCategoriaSelect(cat.value)}
                    >
                      <div className="categoria-icon">
                        {cat.icon}
                      </div>
                      <p>{cat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Estado del Platillo</label>
                <div className="estados">
                  {estados.map((estado) => (
                    <div
                      key={estado.value}
                      className={`estado ${platillo.estadoPlatillo === estado.value ? 'selected' : ''}`}
                      onClick={() => handleEstadoSelect(estado.value)}
                      data-value={estado.value}
                    >
                      <div className="estado-icon">
                        {estado.icon}
                      </div>
                      <p>{estado.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPlatillo;
