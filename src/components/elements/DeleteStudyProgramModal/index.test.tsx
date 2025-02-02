import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteStudyProgramModal from '@/components/elements/DeleteStudyProgramModal';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import { useToast } from '@chakra-ui/react';

const mockAxios = new MockAdapter(axios);

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('DeleteStudyProgramModal', () => {
  const mockOnClose = jest.fn();
  const mockRefetchData = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
    mockRefetchData.mockClear();
    (useToast as jest.Mock).mockClear();
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  it('renders correctly', () => {
    render(
      <DeleteStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        dataToBeDeleted={['1', '2', '3']}
        refetchData={mockRefetchData}
      />,
    );
    expect(screen.getByText('Hapus Program Studi')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Apakah Anda yakin akan menghapus program yang dipilih?',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Batal')).toBeInTheDocument();
    expect(screen.getByText('Hapus')).toBeInTheDocument();
  });

  it("calls onClose when 'Batal' button is clicked", () => {
    render(
      <DeleteStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        dataToBeDeleted={['1', '2', '3']}
        refetchData={mockRefetchData}
      />,
    );
    fireEvent.click(screen.getByText('Batal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls handleDeleteSelected when 'Hapus' button is clicked", async () => {
    render(
      <DeleteStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        dataToBeDeleted={['1', '2', '3']}
        refetchData={mockRefetchData}
      />,
    );
    mockAxios.onDelete('/prodi').reply(200);
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(async () => {
      expect(mockAxios.history.delete.length).toBe(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(mockRefetchData).toHaveBeenCalled();
      }, 1000);
    });
  });

  it('displays error toast if study program not found', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    render(
      <DeleteStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        dataToBeDeleted={['1', '2', '3']}
        refetchData={mockRefetchData}
      />,
    );

    mockAxios.onDelete('/prodi').reply(404);
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
    });

    await waitFor(() => {
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal',
        description: 'Program studi tidak ditemukan!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });

    expect(mockRefetchData).not.toHaveBeenCalled();
  });

  it('displays error toast if deletion conflicts', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    render(
      <DeleteStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        dataToBeDeleted={['1', '2', '3']}
        refetchData={mockRefetchData}
      />,
    );

    mockAxios
      .onDelete('/prodi')
      .reply(409, {
        message: 'Studi program 1 terhubung dengan kaprodi atau alumni',
      });
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
    });

    await waitFor(() => {
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal',
        description: 'Studi program 1 terhubung dengan kaprodi atau alumni!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });

    expect(mockRefetchData).not.toHaveBeenCalled();
  });

  it('displays error toast if deletion failed', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    render(
      <DeleteStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        dataToBeDeleted={['1', '2', '3']}
        refetchData={mockRefetchData}
      />,
    );

    mockAxios.onDelete('/prodi').reply(500);
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
    });

    await waitFor(() => {
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal',
        description: 'Gagal menghapus program studi!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });

    expect(mockRefetchData).not.toHaveBeenCalled();
  });
});
