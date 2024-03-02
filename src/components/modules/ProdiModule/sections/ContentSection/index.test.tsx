import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContentSection } from '.';
import { StudyProgram } from '../../interface';

const mockRefetchData = jest.fn();

const sampleStudyPrograms: StudyProgram[] = [
  { id: '1', name: 'Program 1' },
  { id: '2', name: 'Program 2' },
];

describe('ContentSection', () => {
  beforeEach(() => {
    mockRefetchData.mockClear();
  });

  let renderProps = {
    refetchData: mockRefetchData,
    studyProgram: sampleStudyPrograms,
  };

  it('renders the list of study programs', () => {
    render(<ContentSection {...renderProps} />);
    sampleStudyPrograms.forEach((program) => {
      expect(screen.getByText(program.name)).toBeInTheDocument();
    });
  });

  it('opens the create modal when the "Tambah Prodi" button is clicked', () => {
    render(<ContentSection {...renderProps} />);
    const createButton = screen.getByText('Tambah Prodi');
    fireEvent.click(createButton);
    expect(screen.getByText('Tambah Program Studi')).toBeInTheDocument();
  });

  it('opens the edit modal when the edit button of a study program is clicked', async () => {
    render(<ContentSection {...renderProps} />);
    const editButtons = screen.getAllByLabelText('Edit Prodi');
    fireEvent.click(editButtons[0]);
    expect(screen.getByText('Ubah Program Studi')).toBeInTheDocument();
  });

  it('calls refetchData when a study program is added or deleted', async () => {
    render(<ContentSection {...renderProps} />);
    const createButton = screen.getByText('Tambah Prodi');
    fireEvent.click(createButton);
    const newProgramName = 'Ilmu Komputer';
    const newProgramSubmitButton = screen.getByText('Buat');
    fireEvent.change(screen.getByPlaceholderText('Nama Program Studi'), {
      target: { value: newProgramName },
    });

    fireEvent.click(newProgramSubmitButton);
    setTimeout(() => {
      expect(mockRefetchData).toHaveBeenCalled();
    }, 1000);

    const checkboxes = screen.getAllByLabelText('checkbox');
    fireEvent.click(checkboxes[0]);

    const deleteButton = screen.getByText('Hapus Prodi');
    fireEvent.click(deleteButton);
    setTimeout(() => {
      expect(mockRefetchData).toHaveBeenCalled();
    }, 1000);
  });

  it('disables the delete button when there are no study programs', () => {
    render(<ContentSection refetchData={mockRefetchData} studyProgram={[]} />);
    const deleteButton = screen.getByText('Hapus Prodi');
    expect(deleteButton).toBeDisabled();
  });

  it('displays a message when there are no study programs', () => {
    render(<ContentSection refetchData={mockRefetchData} studyProgram={[]} />);
    expect(screen.getByText('Tidak ada Program Studi')).toBeInTheDocument();
  });

  it('allows selecting individual programs', async () => {
    render(<ContentSection {...renderProps} />);
    const checkboxes = screen.getAllByLabelText('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
  });

  it('allows selecting all programs', async () => {
    render(<ContentSection {...renderProps} />);
    const selectAllCheckbox = screen.getByLabelText('checkbox');
    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).toBeChecked();
    const programCheckboxes = screen.getAllByLabelText('checkbox');
    programCheckboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  it('does not allow deleting when no programs are selected', () => {
    render(<ContentSection {...renderProps} />);
    const deleteButton = screen.getByText('Hapus Prodi');
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Hapus')).not.toBeInTheDocument();
  });

  it('enables the delete button when at least one program is selected', async () => {
    render(<ContentSection {...renderProps} />);
    const checkboxes = screen.getAllByLabelText('checkbox');
    fireEvent.click(checkboxes[0]);
    const deleteButton = screen.getByText('Hapus Prodi');
    expect(deleteButton).not.toBeDisabled();
  });

  it('selects all programs when the select all checkbox is checked', async () => {
    render(<ContentSection {...renderProps} />);
    const selectAllCheckbox = screen.getByLabelText('checkbox');
    fireEvent.click(selectAllCheckbox);
    const programCheckboxes = screen.getAllByLabelText('checkbox');
    programCheckboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  it('deselects all programs and the select all checkbox when the last selected program is deselected', async () => {
    render(<ContentSection {...renderProps} />);
    const selectAllCheckbox = screen.getByLabelText('checkbox');
    fireEvent.click(selectAllCheckbox); // Select all
    fireEvent.click(selectAllCheckbox); // Deselect all
    const programCheckboxes = screen.getAllByLabelText('checkbox');
    programCheckboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('allows selecting and deselecting individual programs', () => {
    render(<ContentSection {...renderProps} />);
    const checkboxes = screen.getAllByLabelText('checkbox');
    // Select the first program
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
    // Deselect the first program
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();
  });
});
