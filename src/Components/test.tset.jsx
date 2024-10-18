import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp'; // Adjust the import path accordingly
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

vi.mock('@react-oauth/google', () => ({
  GoogleLogin: () => (
    <button onClick={() => onSuccess({ credential: 'mock_token' })}>
      Mock Google Login
    </button>
  ),
}));

vi.mock('jwt-decode', () => ({
  jwtDecode: () => ({ email: 'google@example.com' }),
}));

describe('SignUp Component Google Login', () => {
  const mockNavigate = vi.fn();

  beforeAll(() => {
    global.localStorage = {
      setItem: vi.fn(),
    };

    vi.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));
  });

  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
  });

  it('handles Google login successfully', () => {
    fireEvent.click(screen.getByText(/Mock Google Login/i));

    expect(jwtDecode).toHaveBeenCalledWith('mock_token');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'google@example.com',
      JSON.stringify({ email: 'google@example.com' })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('handles Google login error', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const { rerender } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // Simulate an error during Google login
    const error = new Error('Login failed');
    GoogleLogin().props.onError(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Google login failed:', error);
    consoleErrorSpy.mockRestore(); // Restore original console.error
  });

  afterAll(() => {
    vi.resetAllMocks();
  });
});
