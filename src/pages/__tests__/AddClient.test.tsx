import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddClient from '../AddClient';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

global.alert = jest.fn();

type RegistroPayload = {
  usuario: {
    correo: string;
    contrasena: string;
    rol: string;
  };
  consumidor: {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
  };
};

describe('AddClient Component', () => {
  it('envía correctamente el formulario con datos válidos', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    render(
      <BrowserRouter>
        <AddClient />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Juan Pérez'), {
      target: { value: 'Usuario Prueba' },
    });
    fireEvent.change(screen.getByPlaceholderText('juan@ejemplo.com'), {
      target: { value: 'correo@ejemplo.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('3101234567'), {
      target: { value: '3101234567' },
    });
    fireEvent.change(screen.getByPlaceholderText('Calle 123'), {
      target: { value: 'Calle 123' },
    });
    fireEvent.change(screen.getByPlaceholderText('usuario@ejemplo.com'), {
      target: { value: 'usuario@ejemplo.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), {
      target: { value: '12345678' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrar cliente/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const postData = mockedAxios.post.mock.calls[0][1] as RegistroPayload;
    expect(postData.usuario.rol).toBe('CONSUMIDOR');
    expect(postData.usuario.correo).toBe('usuario@ejemplo.com');

    expect(global.alert).toHaveBeenCalledWith('Cliente registrado exitosamente');
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});

