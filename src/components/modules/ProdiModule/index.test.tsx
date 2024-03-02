import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import { ProdiModule } from '.';
import { useToast } from '@chakra-ui/react';

const mockAxios = new MockAdapter(axios);

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('ProdiModule', () => {
  const mockOnClose = jest.fn();
  const mockRefetchData = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
    mockRefetchData.mockClear();
    (useToast as jest.Mock).mockClear();
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  it('fetches study programs and renders them correctly', async () => {
    const mockData = {
      data: [
        { id: '1', name: 'Study Program 1' },
        { id: '2', name: 'Study Program 2' },
      ],
    };
    mockAxios.onGet('/prodi').reply(200, mockData);

    render(<ProdiModule />);

    await waitFor(() => {
      expect(screen.getByText('Study Program 1')).toBeInTheDocument();
      expect(screen.getByText('Study Program 2')).toBeInTheDocument();
    });
  });

  it('displays error message if fetching study programs fails', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    mockAxios.onGet('/prodi').reply(500);

    render(<ProdiModule />);

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

  it('calls refetchData function when refetchData is called', async () => {
    jest.spyOn(React, 'useState').mockReturnValueOnce([[], mockRefetchData]);

    mockAxios.onGet('/prodi').reply(200, { data: [] });

    render(<ProdiModule />);

    await waitFor(() => {
      expect(mockRefetchData).toHaveBeenCalledTimes(1);
    });

    mockRefetchData();

    await waitFor(() => {
      expect(mockRefetchData).toHaveBeenCalledTimes(2);
    });
  });
});
