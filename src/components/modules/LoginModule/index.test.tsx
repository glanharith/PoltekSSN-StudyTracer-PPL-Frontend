import { axios } from '@/utils';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/router';
import { LoginModule } from '.';
import { useToast } from '@chakra-ui/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios.reset();

  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });
  (useToast as jest.Mock).mockReturnValue(jest.fn());
});

const fillForm = (data: any) => {
  fireEvent.change(screen.getByPlaceholderText('email'), {
    target: { value: data.email },
  });
  fireEvent.change(screen.getByPlaceholderText('password'), {
    target: { value: data.password },
  });
};

describe('LoginModule', () => {
  const postBody = {
    email: 'test@gmail.com',
    password: 'password',
  };

  it('should render correctly', async () => {
    act(() => {
      render(<LoginModule />);
    });

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument();
    expect(screen.getByText('Daftar')).toBeInTheDocument();
    expect(screen.getAllByText('Tracer Study')).toHaveLength(2);
  });

  it('should login successfully', async () => {
    mockAxios.onPost('/auth/login').reply(201, { token: 'token' });

    act(() => {
      render(<LoginModule />);
    });

    fillForm(postBody);
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(postBody);
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Berhasil masuk!',
        status: 'success',
      });
      expect(useRouter().push).toHaveBeenCalledWith('/');
    });
  });

  it('should show error if login failed', async () => {
    mockAxios
      .onPost('/auth/login')
      .reply(400, { message: 'Invalid email or password' });

    act(() => {
      render(<LoginModule />);
    });

    fillForm(postBody);
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Gagal masuk',
        description: 'Email atau password tidak tepat',
        status: 'error',
      });
    });
  });

  it('should validate empty fields', async () => {
    act(() => {
      render(<LoginModule />);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    await waitFor(() => {
      expect(screen.getByText('Masukkan email Anda')).toBeInTheDocument();
      expect(screen.getByText('Masukkan password Anda')).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    act(() => {
      render(<LoginModule />);
    });

    const postBodyWithInvalidEmail = {
      ...postBody,
      email: 'not-an-email@',
    };
    fillForm(postBodyWithInvalidEmail);
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    await waitFor(() => {
      expect(screen.getByText('Email tidak valid')).toBeInTheDocument();
    });
  });

  it('should be able to redirect to register form', async () => {
    act(() => {
      render(<LoginModule />);
    });

    fireEvent.click(screen.getByText('Daftar'));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/register');
    });
  });
});
