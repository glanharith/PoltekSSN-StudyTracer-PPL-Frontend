import React from 'react';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import HeadOfStudyProgramModal from '.';
import userEvent from "@testing-library/user-event";

describe('Head of Study Program Modal', () => {
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
    mockAxios.onGet('/prodi').reply(200, mockData);

    await render(
      <HeadOfStudyProgramModal
        isOpen={true}
        onClose={mockOnClose}
        method="CREATE"
        refetchData={() => {}}
      />
    );
    expect(screen.getByText('Buat')).toBeInTheDocument();
    expect(screen.getByText('Tambah Kepala Program Studi')).toBeInTheDocument();

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
    render(
      <HeadOfStudyProgramModal
        refetchData={() => {}}
        isOpen={true}
        onClose={mockOnClose}
        method="CREATE"
      />,
    );
    fireEvent.click(screen.getByText('Buat'));
    await waitFor(() => {
      expect(
        screen.getByText('Nama kepala program studi tidak boleh kosong!'),
      ).toBeInTheDocument();
    });
  });

  it('create kaprodi', async () => {

    const mockRefetch = jest.fn();

    const mockData = {
      message: "Successfully got all study programs",
      data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };

    const result = {
      message: "Successfully created a new head of study program"
    }

    mockAxios.onGet('/prodi').reply(200, mockData);
    mockAxios.onPost('/kaprodi').replyOnce(200, result);
    await render(
      <HeadOfStudyProgramModal
        refetchData={mockRefetch}
        isOpen={true}
        onClose={mockOnClose}
        method="CREATE"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Ilmu Sandi')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Nama Kepala Program Studi'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    const selectInput = document.querySelector('#jurusan'); 
    if (selectInput) { 
      fireEvent.change(selectInput,{ target: { value: '48e941a9-3319-4f4c-8a2e-5d6a3287bf89' }});
    }
    else {
      throw new Error('Select input not found');
    }

    userEvent.click(screen.getByText('Buat'))

    await waitFor( async () => {
      expect(mockAxios.history.post.length).toBe(1);


      expect(mockAxios.history.post[0].data).toEqual(JSON.stringify({
        studyProgramId: '48e941a9-3319-4f4c-8a2e-5d6a3287bf89',
        email: 'john@example.com',
        name: 'John Doe',
        password: 'password123',
      }));

      expect(mockOnClose).toHaveBeenCalled();

      await setTimeout(() => {
        expect(mockRefetch).toHaveBeenCalled()
      }, 1000)
    })
  });

  it('verifies if head of study program name is taken and displays error message', async () => {
    const mockRefetch = jest.fn();

    const mockData = {
      message: "Successfully got all study programs",
      data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };

    mockAxios.onGet('/prodi').reply(200, mockData);
    mockAxios.onPost('/kaprodi').replyOnce(400);
    await render(
      <HeadOfStudyProgramModal
        refetchData={mockRefetch}
        isOpen={true}
        onClose={mockOnClose}
        method="CREATE"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Ilmu Sandi')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Nama Kepala Program Studi'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    const selectInput = document.querySelector('#jurusan'); 
    if (selectInput) { 
      fireEvent.change(selectInput,{ target: { value: '48e941a9-3319-4f4c-8a2e-5d6a3287bf89' }});
    }
    else {
      throw new Error('Select input not found');
    }

    userEvent.click(screen.getByText('Buat'))

    await waitFor(() => {
      expect(
        screen.getByText('Email sudah digunakan!'),
      ).toBeInTheDocument();
    });
  });

  it('verifies unknown displays error message', async () => {
    const mockRefetch = jest.fn();

    const mockData = {
      message: "Successfully got all study programs",
      data: [
        { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
        { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
      ]
    };

    mockAxios.onGet('/prodi').reply(200, mockData);
    mockAxios.onPost('/kaprodi').networkError();
    await render(
      <HeadOfStudyProgramModal
        refetchData={mockRefetch}
        isOpen={true}
        onClose={mockOnClose}
        method="CREATE"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Ilmu Sandi')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Nama Kepala Program Studi'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    const selectInput = document.querySelector('#jurusan'); 
    if (selectInput) { 
      fireEvent.change(selectInput,{ target: { value: '48e941a9-3319-4f4c-8a2e-5d6a3287bf89' }});
    }
    else {
      throw new Error('Select input not found');
    }

    userEvent.click(screen.getByText('Buat'))

    await waitFor(() => {
      expect(
        screen.getByText('Gagal membuat kepala program studi!'),
      ).toBeInTheDocument();

      
    });
  });
});
