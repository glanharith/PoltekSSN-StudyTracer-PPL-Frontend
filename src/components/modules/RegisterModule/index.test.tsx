import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { RegisterModule } from '.';
import { useRouter } from 'next/router';
import MockAdapter from 'axios-mock-adapter';
import { axios } from '@/utils';
import { useToast } from '@chakra-ui/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

const mockAxios = new MockAdapter(axios);

const prodi = [
  { id: 'prodi1', name: 'Prodi 1' },
  { id: 'prodi2', name: 'Prodi 2' },
];

beforeEach(() => {
  mockAxios.reset();

  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });
  (useToast as jest.Mock).mockReturnValue(jest.fn());

  mockAxios.onGet('/prodi').reply(200, { data: prodi });
});

const fillForm = (data: any) => {
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: data.email },
  });
  fireEvent.change(screen.getByLabelText('Nama Lengkap'), {
    target: { value: data.name },
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: data.password },
  });
  fireEvent.change(screen.getByLabelText('Konfirmasi Password'), {
    target: { value: data.confirmPassword },
  });
  fireEvent.change(screen.getByLabelText('Tahun Masuk'), {
    target: { value: data.enrollmentYear },
  });
  fireEvent.change(screen.getByLabelText('Tahun Lulus'), {
    target: { value: data.graduateYear },
  });
  fireEvent.change(screen.getByLabelText('Alamat'), {
    target: { value: data.address },
  });
  fireEvent.change(screen.getByLabelText('No. Telepon'), {
    target: { value: data.phoneNo },
  });
  fireEvent.change(screen.getByLabelText('Jenis Kelamin'), {
    target: { value: data.gender },
  });
  fireEvent.change(screen.getByLabelText('Jurusan'), {
    target: { value: data.studyProgramId },
  });
};

describe('RegisterModule', () => {
  const postBody = {
    email: 'test@gmail.com',
    name: 'Test',
    password: 'password1234',
    confirmPassword: 'password1234',
    enrollmentYear: 2018,
    graduateYear: 2022,
    gender: 'MALE',
    address: 'Rumah',
    phoneNo: '8912345678',
    studyProgramId: prodi[0].id,
    role: 'ALUMNI',
  };

  it('should render correctly', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Nama Lengkap')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Konfirmasi Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Tahun Masuk')).toBeInTheDocument();
    expect(screen.getByLabelText('Tahun Lulus')).toBeInTheDocument();
    expect(screen.getByLabelText('Alamat')).toBeInTheDocument();
    expect(screen.getByLabelText('No. Telepon')).toBeInTheDocument();
    expect(screen.getByLabelText('Jenis Kelamin')).toBeInTheDocument();
    expect(screen.getByLabelText('Jurusan')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Daftar' })).toBeInTheDocument();
    expect(screen.getByText('Masuk')).toBeInTheDocument();
  });

  it('should register successfully', async () => {
    mockAxios.onPost('/auth/register').reply(201);

    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    fillForm(postBody);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(postBody);
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Berhasil mendaftar!',
        status: 'success',
      });
      expect(useRouter().push).toHaveBeenCalledWith('/login');
    });
  });

  it('should show error if username already exists', async () => {
    mockAxios
      .onPost('/auth/register')
      .reply(400, { message: 'User with given email already exists' });

    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    fillForm(postBody);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Pendaftaran gagal',
        description: 'Email sudah terdaftar',
        status: 'error',
      });
    });
  });

  it('should register successfully if graduateYear is empty', async () => {
    mockAxios.onPost('/auth/register').reply(201);

    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    const postBodyWithoutGraduateYear = {
      ...postBody,
      graduateYear: undefined,
    };
    fillForm(postBodyWithoutGraduateYear);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(JSON.parse(mockAxios.history.post[0].data)).toEqual({
        ...postBody,
        graduateYear: -1,
      });
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Berhasil mendaftar!',
        status: 'success',
      });
      expect(useRouter().push).toHaveBeenCalledWith('/login');
    });
  });

  it('should validate empty fields', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(screen.getByText('Masukkan email Anda')).toBeInTheDocument();
      expect(
        screen.getByText('Masukkan nama lengkap Anda'),
      ).toBeInTheDocument();
      expect(screen.getByText('Masukkan password Anda')).toBeInTheDocument();
      expect(
        screen.getByText('Masukkan ulang password Anda'),
      ).toBeInTheDocument();
      expect(screen.getByText('Masukkan tahun masuk Anda')).toBeInTheDocument();
      expect(screen.getByText('Masukkan alamat Anda')).toBeInTheDocument();
      expect(screen.getByText('Masukkan no. telepon Anda')).toBeInTheDocument();
      expect(screen.getByText('Pilih jenis kelamin Anda')).toBeInTheDocument();
      expect(screen.getByText('Pilih jurusan Anda')).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    const postBodyWithInvalidEmail = {
      ...postBody,
      email: 'not-an-email@',
    };
    fillForm(postBodyWithInvalidEmail);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(screen.getByText('Email tidak valid')).toBeInTheDocument();
    });
  });

  it('should validate confirmation password', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    const postBodyWithWrongConfirmationPassword = {
      ...postBody,
      confirmPassword: 'wrong-password',
    };
    fillForm(postBodyWithWrongConfirmationPassword);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(
        screen.getByText('Masukkan password yang sama'),
      ).toBeInTheDocument();
    });
  });

  it('should validate enrollment year', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    const postBodyWithInvalidEnrollmentYear = {
      ...postBody,
      enrollmentYear: 0,
    };
    fillForm(postBodyWithInvalidEnrollmentYear);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(screen.getByText('Tahun tidak valid')).toBeInTheDocument();
    });
  });

  it('should validate graduate year', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    const postBodyWithInvalidGraduateYear = {
      ...postBody,
      graduateYear: 0,
    };
    fillForm(postBodyWithInvalidGraduateYear);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(screen.getByText('Tahun tidak valid')).toBeInTheDocument();
    });
  });

  it('should validate password at least 12 characters', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    const postBodyWithTooShortPassword = {
      ...postBody,
      password: 'password',
      confirmPassword: 'password',
    };
    fillForm(postBodyWithTooShortPassword);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(
        screen.getByText('Password harus minimal 12 karakter'),
      ).toBeInTheDocument();
    });
  });

  it('should validate password max 128 characters', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(prodi[0].name)).toBeInTheDocument();
    });

    const longPassword = 'a'.repeat(129);
    const postBodyWithTooLongPassword = {
      ...postBody,
      password: longPassword,
      confirmPassword: longPassword,
    };
    fillForm(postBodyWithTooLongPassword);
    fireEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    await waitFor(() => {
      expect(
        screen.getByText('Password harus maksimal 128 karakter'),
      ).toBeInTheDocument();
    });
  });

  it('should be able to redirect to login form', async () => {
    act(() => {
      render(<RegisterModule />);
    });

    fireEvent.click(screen.getByText('Masuk'));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/login');
    });
  });
});
