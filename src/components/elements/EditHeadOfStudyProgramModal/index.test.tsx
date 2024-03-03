import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import EditHeadOfStudyProgramModal from '.'; // Ensure this import path is correct
import userEvent from '@testing-library/user-event';

describe('Edit Head of Study Program Modal', () => {
  const mockOnClose = jest.fn();
  const mockAxios = new MockAdapter(axios);
  const kaprodiId = "af3a09c2-b01b-4ec3-afef-b7e990aee1e4"; 

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

    render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        kaprodiId={kaprodiId}
        kaprodiName='suminto'
        studyProgramId='e06513b5-dbe5-4754-978e-bef1a70ac8ee'
        studyProgramName='Ilmu Komputer'
        refetchData={() => {}}
      />
    );

    await waitFor(() => expect(screen.getByDisplayValue('suminto')).toBeInTheDocument());

    // Since "Ilmu Komputer" might not be a value but a visible text, depending on your select implementation, adjust as necessary.
    expect(screen.getByText('Ubah Kepala Program Studi')).toBeInTheDocument();
  });

  it('validates empty name and shows error message', async () => {
    render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        kaprodiId={kaprodiId}
        kaprodiName='suminto'
        studyProgramId='e06513b5-dbe5-4754-978e-bef1a70ac8ee'
        studyProgramName='Ilmu Komputer'
        refetchData={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText('Nama Kaprodi'), { target: { value: '' } });
    fireEvent.submit(screen.getByText('Ubah')); // Assuming the submit button text is 'Ubah'

    await waitFor(() => expect(screen.findByText('Nama kaprodi tidak boleh kosong!')).toBeInTheDocument());
  });

  // Adjusted to ensure correct axios method is checked (should be 'patch' for updates, not 'put')
  it('submits updated data successfully', async () => {
    const updatedName = 'Updated Name';
    const updatedStudyProgramId = 'e06513b5-dbe5-4754-978e-bef1a70ac8ee'; // Assuming you're selecting an existing option

    mockAxios.onPatch(`/kaprodi/${kaprodiId}`).reply(200, {
      message: "Head of study program updated successfully"
    });

    render(
      <EditHeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        kaprodiId={kaprodiId}
        kaprodiName='suminto'
        studyProgramId='e06513b5-dbe5-4754-978e-bef1a70ac8ee'
        studyProgramName='Ilmu Komputer'
        refetchData={() => {}}
      />
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Nama Kaprodi'), { target: { value: updatedName } });
      userEvent.selectOptions(screen.getByLabelText('Jurusan'), updatedStudyProgramId);
    });

    fireEvent.click(screen.getByText('Ubah')); // Assuming the submit button text is 'Ubah'

    await waitFor(() => {
      expect(mockAxios.history.patch.length).toBe(1);
      expect(JSON.parse(mockAxios.history.patch[0].data)).toEqual(expect.objectContaining({
        name: updatedName,
        studyProgramId: updatedStudyProgramId
      }));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
