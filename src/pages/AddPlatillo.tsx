// src/pages/AddPlatillo.tsx
import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import '../styles/addPlatillo.css';

const AddPlatillo = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPlatillo({
      ...platillo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/platillo', {
        ...platillo,
        precioOriginal: parseFloat(platillo.precioOriginal),
        precioDescuento: parseFloat(platillo.precioDescuento),
        cantidadDisponible: parseInt(platillo.cantidadDisponible)
      });

      alert('Platillo agregado exitosamente');
      console.log('Respuesta:', response.data);
    } catch (error: any) {
      alert('Error al agregar el platillo');
      console.error('Error detallado:', error?.response?.data || error.message);
    }
  };

      return (
        <div className="top-navbar">
          {/* Header Fijo con logo a la izquierda y usuario a la derecha */}
          <nav className="navbar navbar-light">
            <div className="logo">
              <img src="../img/carrito.png" alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            </div>
            <div className="user-icon">
              <img src="../img/user.png" alt="Usuario" style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }} />
            </div>
          </nav>

          {/* Contenedor principal del formulario */}
          <div className="addPlatillo-container">
            <h2>Agregar Platillo</h2>

            <form onSubmit={handleSubmit} className="addPlatillo-form">
              {/* Nombre */}
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del Platillo"
                value={platillo.nombre}
                onChange={handleChange}
              />

              {/* Precio Original */}
              <label>Precio Original</label>
              <input
                type="number"
                name="precioOriginal"
                placeholder="Precio Original"
                value={platillo.precioOriginal}
                onChange={handleChange}
              />

              {/* Precio Descuento */}
              <label>Precio Descuento</label>
              <input
                type="number"
                name="precioDescuento"
                placeholder="Precio Descuento"
                value={platillo.precioDescuento}
                onChange={handleChange}
              />

              {/* Categoría */}
              <label>Categoría</label>
              <div className="categorias">
                {[
                  { value: 'ENTRADA', img: 'entrada.png', label: 'Entrada' },
                  { value: 'PLATO_FUERTE', img: 'plato_fuerte.png', label: 'Plato Fuerte' },
                  { value: 'COMIDA_RAPIDA', img: 'comida_rapida.png', label: 'Comida Rápida' },
                  { value: 'POSTRE', img: 'postre.png', label: 'Postre' },
                  { value: 'BEBIDA', img: 'bebida.png', label: 'Bebida' },
                ].map((cat) => (
                  <div
                    key={cat.value}
                    className={`categoria ${platillo.categoriaPlatillo === cat.value ? 'selected' : ''}`}
                    onClick={() => handleCategoriaSelect(cat.value)}
                  >
                    <img src={`../img/${cat.img}`} alt={cat.label} />
                    <p>{cat.label}</p>
                  </div>
                ))}
              </div>

              {/* Estado */}
              <label>Estado</label>
              <div className="estados">
                {[
                  { value: 'DISPONIBLE', img: 'disponible.png', label: 'Disponible' },
                  { value: 'AGOTADO', img: 'agotado.png', label: 'Agotado' },
                ].map((estado) => (
                  <div
                    key={estado.value}
                    className={`estado ${platillo.estadoPlatillo === estado.value ? 'selected' : ''}`}
                    onClick={() => handleEstadoSelect(estado.value)}
                  >
                    <img src={`../img/${estado.img}`} alt={estado.label} />
                    <p>{estado.label}</p>
                  </div>
                ))}
              </div>

              {/* Cantidad Disponible */}
              <label>Cantidad Disponible</label>
              <input
                type="number"
                name="cantidadDisponible"
                placeholder="Cantidad Disponible"
                value={platillo.cantidadDisponible}
                onChange={handleChange}
              />

              {/* Imagen URL */}
              <label>Imagen URL</label>
              <input
                type="text"
                name="imagen"
                placeholder="Imagen URL"
                value={platillo.imagen}
                onChange={handleChange}
              />

              {/* Descripción */}
              <label>Descripción</label>
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={platillo.descripcion}
                onChange={handleChange}
              />

              {/* NIT Restaurante */}
              <label>NIT Restaurante</label>
              <input
                type="text"
                name="nitRestaurante"
                placeholder="NIT Restaurante"
                value={platillo.nitRestaurante}
                onChange={handleChange}
              />

              {/* Botón Submit */}
              <button type="submit">Agregar Platillo</button>
            </form>
          </div>
        </div>
      );

  };


export default AddPlatillo;
