import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteHeadOfStudyProgramModal from '@/components/elements/DeleteHeadOfStudyProgramModal';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import { useToast } from '@chakra-ui/react';

const mockAxios = new MockAdapter(axios);

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('DeleteHeadOfStudyProgramModal', () => {
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
      <DeleteHeadOfStudyProgramModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = { ['1', '2', '3'] }
        refetchData = {mockRefetchData}
      />,
    );
    expect(screen.getByText('Hapus Kepala Program Studi')).toBeInTheDocument();
    expect(screen.getByText('Apakah Anda yakin akan menghapus kaprodi yang dipilih?')).toBeInTheDocument();
    expect(screen.getByText('Batal')).toBeInTheDocument();
    expect(screen.getByText('Hapus')).toBeInTheDocument();
  });

  it('calls handleDeleteKaprodi when "Hapus" button is clicked', async () => {
    render(
      <DeleteHeadOfStudyProgramModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = { ['1', '2', '3'] }
        refetchData = {mockRefetchData}
      />,
    );
    mockAxios.onDelete('/kaprodi').reply(200);
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    setTimeout(() => {
      expect(mockRefetchData).toHaveBeenCalled();
    }, 1000);
  });

  it('calls onClose when "Batal" button is clicked', async () => {
    render(
      <DeleteHeadOfStudyProgramModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = { ['1', '2', '3'] }
        refetchData = {mockRefetchData}
      />,
    );
    fireEvent.click(screen.getByText('Batal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays error toast if deletion fails', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    render(
      <DeleteHeadOfStudyProgramModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = { ['1', '2', '3'] }
        refetchData = {mockRefetchData}
      />,
    );

    mockAxios.onDelete('/kaprodi').reply(500);
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
      expect(mockOnClose).toHaveBeenCalledTimes(0);
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal',
        description: 'Gagal menghapus kaprodi!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
    setTimeout(() => {
      expect(mockRefetchData).toHaveBeenCalled();
    }, 1000);
  });
});