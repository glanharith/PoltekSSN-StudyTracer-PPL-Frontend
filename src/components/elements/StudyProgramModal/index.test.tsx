import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import StudyProgramModal from '@/components/elements/StudyProgramModal';

const fillForm = (data: any) => {
  fireEvent.change(screen.getByLabelText('Nama'), {
    target: { value: data.name },
  });
  fireEvent.change(screen.getByLabelText('Kode'), {
    target: { value: data.code },
  });
  fireEvent.change(screen.getByLabelText('Jenjang Pendidikan'), {
    target: { value: data.level },
  });
};

const studyProgramAttributes = {
  name: 'Computer Science',
  code: 'ABC123',
  level: 'D3',
};

const studyProgram = {
  id: 'aa-bb-11-22',
  ...studyProgramAttributes,
};

describe('StudyProgramModal', () => {
  const mockAxios = new MockAdapter(axios);
  const mockOnClose = jest.fn();
  const mockRefetchData = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
    mockRefetchData.mockClear();
  });

  describe('Create Study Program', () => {
    it('renders correctly', () => {
      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="CREATE"
          refetchData={mockRefetchData}
        />,
      );
      expect(screen.getByText('Tambah Program Studi')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Nama Program Studi'),
      ).toBeInTheDocument();
      expect(screen.getByText('Buat')).toBeInTheDocument();
    });

    it('validates empty name and code and shows error message', async () => {
      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="CREATE"
          refetchData={mockRefetchData}
        />,
      );
      fireEvent.click(screen.getByText('Buat'));
      await waitFor(() => {
        expect(
          screen.getByText('Nama program studi tidak boleh kosong!'),
        ).toBeInTheDocument();

        expect(
          screen.getByText('Kode program studi tidak boleh kosong!'),
        ).toBeInTheDocument();
      });
    });

    it('validates study program code and shows error message', async () => {
      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="CREATE"
          refetchData={mockRefetchData}
        />,
      );
      fillForm(studyProgram);
      fireEvent.change(screen.getByLabelText('Kode'), {
        target: { value: '@#$%^' },
      });
      fireEvent.click(screen.getByText('Buat'));
      await waitFor(() => {
        expect(
          screen.getByText('Kode program studi tidak valid'),
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
          refetchData={mockRefetchData}
        />,
      );
      fillForm(studyProgram);
      fireEvent.click(screen.getByText('Buat'));

      await waitFor(() => {
        expect(mockAxios.history.post.length).toBe(1);
        expect(mockAxios.history.post[0].data).toEqual(
          JSON.stringify({ ...studyProgramAttributes }),
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
          refetchData={mockRefetchData}
        />,
      );
      fillForm(studyProgram);
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
          refetchData={mockRefetchData}
        />,
      );
      fillForm(studyProgram);
      fireEvent.click(screen.getByText('Buat'));

      await waitFor(() => {
        expect(
          screen.getByText('Gagal membuat program studi!'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Update Study Program', () => {
    it('renders correctly', () => {
      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="EDIT"
          refetchData={mockRefetchData}
        />,
      );
      expect(screen.getByText('Ubah Program Studi')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Nama Program Studi'),
      ).toBeInTheDocument();
      expect(screen.getByText('Ubah')).toBeInTheDocument();
    });

    it('validates empty name and code and shows error message', async () => {
      render(
        <StudyProgramModal
          isOpen={true}
          onClose={mockOnClose}
          method="EDIT"
          refetchData={mockRefetchData}
        />,
      );
      fireEvent.click(screen.getByText('Ubah'));
      await waitFor(() => {
        expect(
          screen.getByText('Nama program studi tidak boleh kosong!'),
        ).toBeInTheDocument();

        expect(
          screen.getByText('Kode program studi tidak boleh kosong!'),
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
          refetchData={mockRefetchData}
        />,
      );
      fillForm(studyProgram);
      fireEvent.click(screen.getByText('Ubah'));

      await waitFor(() => {
        expect(mockAxios.history.patch.length).toBe(1);
        expect(mockAxios.history.patch[0].data).toEqual(
          JSON.stringify({ ...studyProgramAttributes }),
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
          refetchData={mockRefetchData}
        />,
      );

      fillForm(studyProgram);

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
          refetchData={mockRefetchData}
        />,
      );

      fillForm(studyProgram);

      fireEvent.click(screen.getByText('Ubah'));

      await waitFor(() => {
        expect(
          screen.getByText('Gagal mengubah program studi!'),
        ).toBeInTheDocument();
      });
    });
  });
  
});
