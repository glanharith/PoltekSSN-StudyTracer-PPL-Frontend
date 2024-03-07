import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import { ViewProfile } from '.';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import { ProfileModule } from '../..';
import { useToast } from '@chakra-ui/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('ViewProfile', () => {
  const mockAxios = new MockAdapter(axios);
  const mockOnClose = jest.fn();

  const mockUserData = {
    name: 'John Doe',
    password:'newpassword',
    alumni: {
      phoneNo: '1234567890',
      address: '123 Main St',
      enrollmentYear: 2020,
    },
  };  const secMockUserData = {
    name: 'Jane Doe',
    password:'newpassword',
    alumni: {
      phoneNo: '1234567890',
      address: '123 Main St',
      enrollmentYear: 2020,
    },
  };

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
    (useToast as jest.Mock).mockClear();
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    mockAxios.restore();
  });

  test('update profile information correctly', async () => {

    mockAxios.onPatch('/profile').reply(200, { data: mockUserData });

    render(<ProfileModule />);
    fireEvent.input(screen.getByLabelText('Nama Lengkap'), { target: { value: 'New Name' } });
    fireEvent.input(screen.getByLabelText('Password Baru'), { target: { value: 'newpassword' } });
    fireEvent.input(screen.getByLabelText('Konfirmasi Password'), { target: { value: 'newpassword' } });
    fireEvent.input(screen.getByLabelText('Alamat'), { target: { value: 'address' } });
    fireEvent.input(screen.getByLabelText('No. Telepon'), { target: { value: '0000' } });
    fireEvent.input(screen.getByLabelText('Tahun Masuk'), { target: { value: 2021 } });
    fireEvent.click(screen.getByText('Simpan'));
    await waitFor(() => {
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Profil berhasil diperbarui!',
        status: 'success',
      });
    });
    expect(mockAxios.history.patch.length).toBe(1);
    
  });
 
    
  it('should display error message when confirmation password does not match password', async () => {
  

    render(<ViewProfile user={mockUserData} />);
  
    fireEvent.input(screen.getByLabelText('Password Baru'), { target: { value: 'password123' } });
    fireEvent.input(screen.getByLabelText('Konfirmasi Password'), { target: { value: 'differentpassword' } });
    fireEvent.click(screen.getByText('Simpan'));

    await waitFor(() => {
      expect(screen.getByText('Masukkan password yang sama')).toBeInTheDocument();
    });
  });
  test('give error when no data is passed', async () => {
    mockAxios.onPatch('/profile').reply(200, { data: secMockUserData });

    render(<ViewProfile user={mockUserData} />);
    fireEvent.click(screen.getByText('Simpan'));
    await waitFor(() => {
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Profil gagal diperbarui!',
        status: 'error',
      });
    });
    expect(mockAxios.history.patch.length).toBe(0);
    
  });
  
  
});