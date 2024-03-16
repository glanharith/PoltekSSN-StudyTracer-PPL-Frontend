import React from 'react';
import {
  render,
  waitFor,
  screen,
  act,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import { ProdiModule } from '.';
import { useToast } from '@chakra-ui/react';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('ProdiModule', () => {
  const mockAxios = new MockAdapter(axios);
  const mockOnClose = jest.fn();
  const refetchData = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
    refetchData.mockClear();
    (useToast as jest.Mock).mockClear();
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  const prodi = {
    message: 'Successfully got all study programs',
    data: [
      { id: '48e941a9-3319-4f4c-8a2e-5d6a3287bf89', name: 'Ilmu Sandi' },
      { id: '68393bf0-0d80-43a7-889b-c46186a18777', name: 'Ilmu Siber' },
    ],
  };

  it('fetches study programs and renders them correctly', async () => {
    mockAxios.onGet('/prodi').reply(200, prodi);

    await act(async () => {
      render(<ProdiModule />);
    });

    await waitFor(() => {
      expect(screen.getByText('Ilmu Sandi')).toBeInTheDocument();
      expect(screen.getByText('Ilmu Siber')).toBeInTheDocument();
    });
  });

  it('displays error message if fetching study programs fails', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    mockAxios.onGet('/prodi').reply(500);

    await act(async () => {
      render(<ProdiModule />);
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal',
        description: 'Gagal memuat daftar program studi!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  });

  it('create prodi', async () => {
    const result = {
      message: "Successfully created a new study program"
    };
  
    mockAxios.onPost('/prodi').replyOnce(200, result);
    mockAxios.onGet('/prodi').reply(200, prodi);
  
    await act(async () => {
      render(<ProdiModule />);
    });
  
    fireEvent.click(screen.getByText("Tambah Prodi"));
  
    fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), { target: { value: 'Ilmu Komputer' } });
    fireEvent.change(screen.getByPlaceholderText('Kode Program Studi'), { target: { value: 'CS1234' } });
    fireEvent.change(screen.getByLabelText('Jenjang Pendidikan'), { target: { value: 'D3' } });
  
    fireEvent.click(screen.getByText('Buat'));
  
    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({
        name: 'Ilmu Komputer',
        code: 'CS1234',
        level: 'D3'
      }));
  
      expect(mockAxios.history.get.length).toBe(1);
    });
  });
  
  it('calls refetchData when clicking "Tambah Prodi"', async () => {
    mockAxios.onGet('/prodi').reply(200, prodi);
    mockAxios.onPost('/prodi').reply(200, { message: "Success" }); // Mock the POST request

    await act(async () => {
      render (
        <ProdiModule/>
      )
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Tambah Prodi'));
      fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), { target: { value: 'Ilmu Komputer' } });
      userEvent.click(screen.getByText('Buat'));
    });

    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(2);
    });
});

});
