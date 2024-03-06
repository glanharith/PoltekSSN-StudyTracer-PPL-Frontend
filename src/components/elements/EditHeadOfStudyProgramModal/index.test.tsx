import React from 'react';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import EditHeadOfStudyProgramModal from '.';
import userEvent from "@testing-library/user-event";

describe('Edit Head of Study Program Modal', () => {
  const mockOnClose = jest.fn();
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
  });

  it('renders correctly', async () => {
    const mockData = {
      message: "Successfully got all study programs",
      data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };
    const mockStudyProgram = {
      name: "Ilmu Padi",
      id: '4685953a-dd4a-4b3e-83a6-9bb80fcdf455'
    };
    const mockKaprodi = {
      id: '8912b2ba-a09b-401b-ba6d-bf4974f36789',
      studyProgramId: mockStudyProgram.id
    };
    const mockUser = {
      name: "Sunaryo",
      email: "sunaryo@gmail.com",
      password: "KetoprakSunaryo",
      id: mockKaprodi.id,
      role: "HEAD_STUDY_PROGRAM"
    }
    mockAxios.onGet('/prodi').reply(200, mockData);

    await render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        refetchData={() => {}}
        kaprodiId={mockKaprodi.id}
        kaprodiName={mockUser.name}
        studyProgramId={mockKaprodi.studyProgramId}
        studyProgramName={mockStudyProgram.name}
      />
    );
    expect(screen.getByText('Ubah')).toBeInTheDocument();
    expect(screen.getByText('Batal')).toBeInTheDocument();
    expect(screen.getByText('Ubah Kepala Program Studi')).toBeInTheDocument();
  });

  it('validates empty name and shows error message', async () => {
    const mockData = {
      message: "Successfully got all study programs",
      data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };
    const mockStudyProgram = {
      name: "Ilmu Padi",
      id: '4685953a-dd4a-4b3e-83a6-9bb80fcdf455'
    };
    const mockKaprodi = {
      id: '8912b2ba-a09b-401b-ba6d-bf4974f36789',
      studyProgramId: mockStudyProgram.id
    };
    const mockUser = {
      name: "Sunaryo",
      email: "sunaryo@gmail.com",
      password: "KetoprakSunaryo",
      id: mockKaprodi.id,
      role: "HEAD_STUDY_PROGRAM"
    }
    mockAxios.onGet('/prodi').reply(200, mockData);

    await render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        refetchData={() => {}}
        kaprodiId={mockKaprodi.id}
        kaprodiName={''}
        studyProgramId={mockKaprodi.studyProgramId}
        studyProgramName={mockStudyProgram.name}
      />
    );
    fireEvent.click(screen.getByText('Ubah'));
    await waitFor(() => {
      expect(
        screen.getByText('Nama kepala program studi tidak boleh kosong!')
      ).toBeInTheDocument();
    });
  });

  it('submits the form and calls API', async () => {
    const mockData = {
      message: "Successfully got all study programs",
      data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };
    const mockStudyProgram = {
      name: "Ilmu Padi",
      id: '4685953a-dd4a-4b3e-83a6-9bb80fcdf455'
    };
    const mockStudyProgram2 = {
      name: "Ilmu Menyala",
      id: '4685953a-dd4a-4b3e-83a6-9bb80fcdf466'
    };
    const mockKaprodi = {
      id: '8912b2ba-a09b-401b-ba6d-bf4974f36789',
      studyProgramId: mockStudyProgram.id
    };
    const mockUser = {
      name: "Sunaryo",
      email: "sunaryo@gmail.com",
      password: "KetoprakSunaryo",
      id: mockKaprodi.id,
      role: "HEAD_STUDY_PROGRAM"
    }
    mockAxios.onGet('/prodi').reply(200, mockData);

    await render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        refetchData={() => {}}
        kaprodiId={mockKaprodi.id}
        kaprodiName={mockUser.name}
        studyProgramId={mockKaprodi.studyProgramId}
        studyProgramName={mockStudyProgram.name}
      />
    );
    fireEvent.change(screen.getByLabelText('Program Studi'), {
      target: { value: mockStudyProgram2.id }
    })
    fireEvent.click(screen.getByText('Ubah'));
    await waitFor(() => {
      expect(mockAxios.history.patch.length).toBe(1);
    });
  });

  it('invalid inputs and not able to call API', async () => {
    const mockData = {
      message: "Successfully got all study programs",
      data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };
    const mockStudyProgram = {
      name: "Ilmu Padi",
      id: '4685953a-dd4a-4b3e-83a6-9bb80fcdf455'
    };
    const mockStudyProgram2 = {
      name: "Ilmu Menyala",
      id: '4685953a-dd4a-4b3e-83a6-9bb80fcdf466'
    };
    const mockKaprodi = {
      id: '8912b2ba-a09b-401b-ba6d-bf4974f36789',
      studyProgramId: mockStudyProgram.id
    };
    const mockUser = {
      name: "Sunaryo",
      email: "sunaryo@gmail.com",
      password: "KetoprakSunaryo",
      id: mockKaprodi.id,
      role: "HEAD_STUDY_PROGRAM"
    }
    mockAxios.onGet('/prodi').reply(200, mockData);

    await render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        refetchData={() => {}}
        kaprodiId={mockKaprodi.id}
        kaprodiName={mockUser.name}
        studyProgramId={mockKaprodi.studyProgramId}
        studyProgramName={mockStudyProgram.name}
      />
    );
    fireEvent.change(screen.getByLabelText('Program Studi'), {
      target: { value: mockStudyProgram.id }
    })
    fireEvent.click(screen.getByText('Ubah'));
    await waitFor(() => {
      expect(mockAxios.history.patch.length).toBe(0);
    });
  });
});