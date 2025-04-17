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
      const response = await axios.post('/platillo', platillo);
      alert('Platillo agregado exitosamente');
    } catch (error) {
      alert('Error al agregar el platillo');
    }
  };

  return (
    <div className="addPlatillo-container">
      <h2>Agregar Platillo</h2>
      <form onSubmit={handleSubmit} className="addPlatillo-form">
        <input type="text" name="nombre" placeholder="Nombre" value={platillo.nombre} onChange={handleChange} />
        <input type="number" name="precioOriginal" placeholder="Precio Original" value={platillo.precioOriginal} onChange={handleChange} />
        <input type="number" name="precioDescuento" placeholder="Precio Descuento" value={platillo.precioDescuento} onChange={handleChange} />
        
        <select name="categoriaPlatillo" value={platillo.categoriaPlatillo} onChange={handleChange}>
          <option value="ENTRADA">Entrada</option>
          <option value="PLATO_FUERTE">Plato Fuerte</option>
          <option value="COMIDA_RAPIDA">Comida Rápida</option>
          <option value="POSTRE">Postre</option>
          <option value="BEBIDA">Bebida</option>
        </select>

        <select name="estadoPlatillo" value={platillo.estadoPlatillo} onChange={handleChange}>
          <option value="DISPONIBLE">Disponible</option>
          <option value="AGOTADO">Agotado</option>
        </select>

        <input type="number" name="cantidadDisponible" placeholder="Cantidad Disponible" value={platillo.cantidadDisponible} onChange={handleChange} />
        <input type="text" name="imagen" placeholder="Imagen URL" value={platillo.imagen} onChange={handleChange} />
        <input type="text" name="descripcion" placeholder="Descripción" value={platillo.descripcion} onChange={handleChange} />
        <input type="text" name="nitRestaurante" placeholder="NIT Restaurante" value={platillo.nitRestaurante} onChange={handleChange} />
        
        <button type="submit">Agregar Platillo</button>
      </form>
    </div>
  );
};

export default AddPlatillo;