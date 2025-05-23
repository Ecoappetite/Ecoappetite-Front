import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';
import * as authService from '../../services/authService';

jest.mock('../../services/authService'); // Mockeamos el servicio

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el título y los campos de entrada', () => {
    renderLogin();

    expect(screen.getByText('¡Bienvenido!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
  });

  it('llama al servicio de login con los datos correctos', async () => {
    const mockLogin = authService.login as jest.Mock;
    mockLogin.mockResolvedValue('fake-token');

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
      target: { name: 'correo', value: 'usuario@ejemplo.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { name: 'contrasena', value: '12345678' },
    });

    const submitButton = screen.getAllByRole('button', { name: /iniciar sesión/i })
      .find(btn => btn.getAttribute('type') === 'submit');

    if (!submitButton) throw new Error('No se encontró el botón de enviar');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('usuario@ejemplo.com', '12345678');
    });
  });
});
