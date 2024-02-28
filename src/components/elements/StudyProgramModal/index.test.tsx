import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import StudyProgramModal from '@/components/elements/StudyProgramModal';

describe('StudyProgramModal', () => {
  const mockAxios = new MockAdapter(axios);
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
  });

  describe('Create Study Program', () => {
    it('renders correctly', () => {
      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="CREATE"
        />,
      );
      expect(screen.getByText('Tambah Program Studi')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Nama Program Studi'),
      ).toBeInTheDocument();
      expect(screen.getByText('Buat')).toBeInTheDocument();
    });

    it('validates empty name and shows error message', async () => {
      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="CREATE"
        />,
      );
      fireEvent.click(screen.getByText('Buat'));
      await waitFor(() => {
        expect(
          screen.getByText('Nama program studi tidak boleh kosong!'),
        ).toBeInTheDocument();
      });
    });

    it('submits the form and calls API', async () => {
      mockAxios.onPost(`/prodi`).reply(200);

      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="CREATE"
        />,
      );
      fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), {
        target: { value: 'Informatika' },
      });
      fireEvent.click(screen.getByText('Buat'));

      await waitFor(() => {
        expect(mockAxios.history.post.length).toBe(1);
        expect(mockAxios.history.post[0].data).toEqual(
          JSON.stringify({ name: 'Informatika' }),
        );
      });
    });

    it('verifies if study program name is taken and displays error message', async () => {
      mockAxios.onPost(`/prodi`).reply(409);

      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="CREATE"
        />,
      );
      fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), {
        target: { value: 'Informatika' },
      });
      fireEvent.click(screen.getByText('Buat'));

      await waitFor(() => {
        expect(
          screen.getByText('Nama program studi sudah digunakan!'),
        ).toBeInTheDocument();
      });
    });

    it('handles API error and displays error message', async () => {
      mockAxios.onPost(`/prodi`).networkError();

      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="CREATE"
        />,
      );
      fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), {
        target: { value: 'Informatika' },
      });
      fireEvent.click(screen.getByText('Buat'));

      await waitFor(() => {
        expect(
          screen.getByText('Gagal membuat program studi!'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Update Study Program', () => {
    const studyProgram = {
      id: 'abc123',
      name: 'Computer Science',
    };
    it('renders correctly', () => {
      render(
        <StudyProgramModal isOpen={true} onClose={mockOnClose} method="EDIT" />,
      );
      expect(screen.getByText('Ubah Program Studi')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Nama Program Studi'),
      ).toBeInTheDocument();
      expect(screen.getByText('Ubah')).toBeInTheDocument();
    });

    it('validates empty name and shows error message', async () => {
      render(
        <StudyProgramModal isOpen={true} onClose={mockOnClose} method="EDIT" />,
      );
      fireEvent.click(screen.getByText('Ubah'));
      await waitFor(() => {
        expect(
          screen.getByText('Nama program studi tidak boleh kosong!'),
        ).toBeInTheDocument();
      });
    });

    it('submits the form and calls API', async () => {
      mockAxios.onPatch(`/prodi/${studyProgram.id}`).reply(200);

      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="EDIT"
          studyProgramId={studyProgram.id}
        />,
      );
      fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), {
        target: { value: 'Informatika' },
      });
      fireEvent.click(screen.getByText('Ubah'));

      await waitFor(() => {
        expect(mockAxios.history.patch.length).toBe(1);
        expect(mockAxios.history.patch[0].data).toEqual(
          JSON.stringify({ name: 'Informatika' }),
        );
      });
    });

    it('verifies if study program name is taken and displays error message', async () => {
      mockAxios.onPatch(`/prodi/${studyProgram.id}`).reply(409);

      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="EDIT"
          studyProgramId={studyProgram.id}
        />,
      );
      fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), {
        target: { value: 'Informatika' },
      });
      fireEvent.click(screen.getByText('Ubah'));

      await waitFor(() => {
        expect(
          screen.getByText('Nama program studi sudah digunakan!'),
        ).toBeInTheDocument();
      });
    });

    it('handles API error and displays error message', async () => {
      mockAxios.onPatch(`/prodi/${studyProgram.id}`).networkError();

      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="EDIT"
          studyProgramId={studyProgram.id}
        />,
      );
      fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), {
        target: { value: 'Informatika' },
      });
      fireEvent.click(screen.getByText('Ubah'));

      await waitFor(() => {
        expect(
          screen.getByText('Gagal mengubah program studi!'),
        ).toBeInTheDocument();
      });
    });
  });
});
