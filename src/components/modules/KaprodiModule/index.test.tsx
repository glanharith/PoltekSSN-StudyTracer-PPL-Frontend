import React from 'react';
import { render, screen, waitFor, fireEvent, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import { KaprodiModule } from '.';
import { HeaderSection } from './sections';
import userEvent from '@testing-library/user-event';

describe('Header Section of Kaprodi Module', () => {
  const refetchData = jest.fn();
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
    refetchData.mockClear();
  });

  const prodi = {
    message: "Successfully got all study programs",
    data: [
      { id: "48e941a9-3319-4f4c-8a2e-5d6a3287bf89", name: "Ilmu Sandi" },
      { id: "68393bf0-0d80-43a7-889b-c46186a18777", name: "Ilmu Siber" }
    ]
  };

  const kaprodi = [
    {
        id: "45bee50e-0f4b-426f-8b6f-65f9ab307040",
        name: "yudiasdsai",
        headStudyProgram: {
            studyProgram: {
                name: "yudiasdsai"
            }
        },
        email: "yudi.putra@ui.asdasdsad2er22asda"
    }
]

  it("renders correctly", async () => {
    mockAxios.onGet('/prodi').reply(200, prodi);
    await act(async () => {
      render (
        <KaprodiModule/>
      )
    });
  
    expect(screen.getByText("Daftar Kepala Program Studi")).toBeInTheDocument();
  })

  it('render headers and modal correctly', async () => {

    mockAxios.onGet('/prodi').reply(200, prodi);
    await act(async () => {
      render (
        <KaprodiModule/>
      )
    });
    fireEvent.click(screen.getByText("Tambah Kaprodi"))
    fireEvent.click(screen.getByText("Batal"))
  });

  it("renders list kaprodi", async () => {
    mockAxios.onGet('/prodi').reply(200, prodi);
    mockAxios.onGet('/kaprodi').reply(200, kaprodi);

    await act(async () => {
      render (
        <KaprodiModule/>
      )
    });
    expect(mockAxios.history.get.length).toBeGreaterThanOrEqual(1)
  })

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
    mockAxios.onGet('/kaprodi').reply(200, kaprodi);
    await act(async () => {
      render (
        <KaprodiModule/>
      )
    });
    fireEvent.click(screen.getByText("Tambah Kaprodi"))
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

      await setTimeout(() => {
        expect(mockRefetch).toHaveBeenCalled()
      }, 1000)
    })
  });
});
