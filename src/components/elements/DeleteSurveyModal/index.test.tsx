import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteSurveyModal from '@/components/elements/DeleteSurveyModal'
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import { useToast } from '@chakra-ui/react';

const mockAxios = new MockAdapter(axios);

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('DeleteSurveyModal', () => {
  const mockOnClose = jest.fn();
  const mockRefetchData = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
    mockRefetchData.mockClear();
    (useToast as jest.Mock).mockClear();
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  it('renders correctly', async () => {
    render(
      <DeleteSurveyModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = { '84e8ebba-c134-4a48-a3c9-0a6025e1aad8' }
        refetchData = {mockRefetchData}
      />,
    );
    expect(screen.getByText('Hapus Survey')).toBeInTheDocument();
    expect(screen.getByText('Apakah Anda yakin akan menghapus survey yang dipilih?')).toBeInTheDocument();
    expect(screen.getByText('Batal')).toBeInTheDocument();
    expect(screen.getByText('Hapus')).toBeInTheDocument();
  });

  it('calls handleDeleteSurvey when "Hapus" button is clicked', async () => {
    render(
      <DeleteSurveyModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = { '84e8ebba-c134-4a48-a3c9-0a6025e1aad8' }
        refetchData = {mockRefetchData}
      />,
    );
    mockAxios.onDelete('/survey/84e8ebba-c134-4a48-a3c9-0a6025e1aad8').reply(200);
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
      <DeleteSurveyModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = {'84e8ebba-c134-4a48-a3c9-0a6025e1aad8'}
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
      <DeleteSurveyModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = {'84e8ebba-c134-4a48-a3c9-0a6025e1aad8'}
        refetchData = {mockRefetchData}
      />,
    );

    mockAxios.onDelete('/survey/84e8ebba-c134-4a48-a3c9-0a6025e1aad8').reply(500);
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1);
      expect(mockOnClose).toHaveBeenCalledTimes(0);
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal',
        description: 'Gagal menghapus survey!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        expect(mockRefetchData).toHaveBeenCalled();
      }, 1000);
    })
  })

  it('calls refetchData after a delay', async () => {
    jest.useFakeTimers();
    render(
      <DeleteSurveyModal
        isOpen = {true}
        onClose = {mockOnClose}
        dataToBeDeleted = {'84e8ebba-c134-4a48-a3c9-0a6025e1aad8'}
        refetchData = {mockRefetchData}
      />,
    );
    mockAxios.onDelete('/survey/84e8ebba-c134-4a48-a3c9-0a6025e1aad8').reply(200);
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(() => expect(mockAxios.history.delete.length).toBe(1));
    jest.advanceTimersByTime(1000);
    await waitFor(() => expect(mockRefetchData).toHaveBeenCalled());

    jest.useRealTimers();
  });
})