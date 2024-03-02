import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import EditHeadOfStudyProgramModal from '.'; 
import userEvent from '@testing-library/user-event';

describe('Edit Head of Study Program Modal', () => {
  const mockOnClose = jest.fn();
  const mockAxios = new MockAdapter(axios);
  const kaprodiId = "af3a09c2-b01b-4ec3-afef-b7e990aee1e4"; 
  const initialData = {
    name: 'suminto',
    studyProgramId: 'e06513b5-dbe5-4754-978e-bef1a70ac8ee',
    studyProgramName: 'Ilmu Komputer'
  };

  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();    
  });

  it('renders correctly with pre-loaded data', async () => {
    const mockData = {
    message: "Successfully got all study programs",
    data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };
    mockAxios.onGet('/prodi').reply(200, mockData);

    mockAxios.onGet(`/kaprodi/${kaprodiId}`).reply(200, initialData);
    await render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        kaprodiId={kaprodiId}
        method="EDIT"
        refetchData={() => {}}
      />
    );
    expect(screen.getByDisplayValue(initialData.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialData.studyProgramName)).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText("Edit Kepala Program Studi")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
    });
  });

  it('validates empty name and shows error message', async () => {
    const mockData = {
    message: "Successfully got all study programs",
    data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };
    mockAxios.onGet('/prodi').reply(200, mockData);

    mockAxios.onGet(`/kaprodi/${kaprodiId}`).reply(200, initialData);
    render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        kaprodiId={kaprodiId}
        method="EDIT"
        refetchData={() => {}}
      />
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Nama Kepala Prodi'), { target: { value: '' } });
      fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));
    });

    expect(await screen.findByText('Nama kepala program studi tidak boleh kosong!')).toBeInTheDocument();
  });

  it('submits updated data successfully', async () => {
    const updatedName = 'Updated Name';
    const updatedStudyProgramId = 'updatedStudyProgramId';

    mockAxios.onPatch(`/kaprodi/${kaprodiId}`).reply(200, {
      message: "Head of study program updated successfully"
    });

    render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        kaprodiId={kaprodiId}
        method="EDIT"
        refetchData={() => {}}
      />
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Nama Kepala Prodi'), { target: { value: updatedName } });
      fireEvent.change(screen.getByLabelText('Study Program'), { target: { value: updatedStudyProgramId } });
      fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));
    });

    await waitFor(() => {
      expect(mockAxios.history.put.length).toBe(1);
      expect(mockAxios.history.put[0].data).toEqual(expect.stringContaining(updatedName));
      expect(mockAxios.history.put[0].data).toEqual(expect.stringContaining(updatedStudyProgramId));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
