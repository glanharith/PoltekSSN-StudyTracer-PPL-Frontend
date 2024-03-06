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
                name: "yudiasdsaii"
            }
        },
        email: "yudi.putra@ui.asdasdsad2er22asda"
    },
    {
      id: "62eedb5f-b2b2-448b-8979-954f29ad4b3d",
      name: "hanifhanif",
      headStudyProgram: {
          studyProgram: {
              name: "ilmu padi"
          }
      },
      email: "hanif.hanif@ui.asdasdsad2er22asda"
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

  it('able to select kaprodi for deletion', async () => {
    mockAxios.onGet('/prodi').reply(200, prodi);
    mockAxios.onGet('/kaprodi').reply(200, kaprodi);

    await act(async () => {
      render (
        <KaprodiModule/>
      )
    });
    await waitFor(() => expect(screen.getByText(kaprodi[0].name)).toBeInTheDocument());

    const kaprodiCheckbox = screen.getByLabelText("checkbox");
    const checkboxes = screen.getAllByLabelText("checkboxes");

    fireEvent.click(kaprodiCheckbox);
    fireEvent.click(kaprodiCheckbox);

    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
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
  });

  it("delete kaprodi", async () => {
    mockAxios.onGet('/prodi').reply(200, prodi);
    mockAxios.onGet('/kaprodi').reply(200, kaprodi);
    mockAxios.onDelete('/kaprodi').reply(200)

    await act(async () => {
      render (
        <KaprodiModule/>
      )
    });
    await waitFor(() => expect(screen.getByText(kaprodi[0].name)).toBeInTheDocument());

    const kaprodiCheckbox = screen.getByLabelText("checkbox");
    fireEvent.click(kaprodiCheckbox);

    fireEvent.click(screen.getByText('Hapus Kaprodi'));
    fireEvent.click(screen.getByText('Hapus'));

    await waitFor(() => expect(mockAxios.history.delete.length).toBe(1));
  });

  it("edit kaprodi", async () => {
    mockAxios.onGet('/prodi').reply(200, prodi);
    mockAxios.onGet('/kaprodi').reply(200, kaprodi);
    mockAxios.onPatch(`/kaprodi/${kaprodi[0].id}`).reply(200);

    await act(async () => {
      render (
        <KaprodiModule/>
      )
    });
    await waitFor(() => expect(screen.getByText(kaprodi[0].name)).toBeInTheDocument());

    fireEvent.click(screen.getAllByLabelText('Edit Prodi')[0]);
    expect(screen.getByText('Ubah Kepala Program Studi')).toBeInTheDocument();
  
    const nameInput = screen.getByPlaceholderText('Nama Kepala Program Studi');
    const prodiInput = screen.getByLabelText('Program Studi');

    fireEvent.change(nameInput, { target: { value: 'Nama baru' } });
    fireEvent.change(prodiInput, { target: { value: prodi.data[0].id } })
    fireEvent.click(screen.getByText('Ubah'));

    await waitFor(() => {
      expect(mockAxios.history.patch.length).toBe(1);
    })
  
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
