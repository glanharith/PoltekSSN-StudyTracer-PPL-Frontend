import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormEditor } from '.';
import { FormEditorInput } from './interface';

const actTimeout = async (f: () => void) =>
  await act(async () => {
    setTimeout(f, 5000);
  });

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('GenericFormTextInput', () => {
  const data: FormEditorInput = {
    title: 'Sample Survey',
    description: 'Lorem ipsum dolor sit amet',
    type: 'CAREER',
    startTime: new Date(2024, 1, 1),
    endTime: new Date(2024, 3, 3),
    updateQuestions: [
      {
        id: 'uuid1',
        question: 'Question',
        order: 0,
        type: 'TEXT',
      },
    ],
    newQuestions: [],
    deleteQuestions: [],
  };

  it('should render form editor correctly', () => {
    render(<FormEditor existingData={data} id="uuid" />);

    expect(screen.getByDisplayValue(data.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(data.description)).toBeInTheDocument();
    expect(screen.getByLabelText('Tipe Survey')).toBeInTheDocument();
    expect(screen.getByLabelText('Tanggal Mulai')).toBeInTheDocument();
    expect(screen.getByLabelText('Tanggal Selesai')).toBeInTheDocument();
    expect(screen.getByText('Simpan')).toBeInTheDocument();
  });

  it('should save text question successfully', async () => {
    const dataText = {
      ...data,
      type: 'CURRICULUM',
      description: 'Updated Description',
      startTime: new Date(2024, 2, 2),
      endTime: new Date(2024, 4, 4),
      newQuestions: [{ question: 'New Question', type: 'TEXT' }],
    };

    render(<FormEditor existingData={data} id="uuid" />);

    fireEvent.change(screen.getByDisplayValue(data.title), {
      target: { value: dataText.title },
    });
    fireEvent.change(screen.getByDisplayValue(data.description), {
      target: { value: dataText.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataText.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataText.startTime },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataText.endTime },
    });
    await actTimeout(() => {
      fireEvent.click(screen.getByText('Tambah Pertanyaan'));
    });
    fireEvent.change(screen.getByPlaceholderText('Pertanyaan'), {
      target: { value: dataText.newQuestions[0].question },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });

  it('should save radio question successfully', async () => {
    const dataRadio: FormEditorInput = {
      ...data,
      newQuestions: [
        {
          question: 'Question',
          type: 'RADIO',
          options: [{ label: 'Option 1' }, { label: 'Option 2' }],
        },
      ],
    };

    render(<FormEditor existingData={data} />);

    fireEvent.change(screen.getByDisplayValue(data.title), {
      target: { value: dataRadio.title },
    });
    fireEvent.change(screen.getByDisplayValue(data.description), {
      target: { value: dataRadio.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataRadio.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataRadio.startTime },
    });
    fireEvent.change(screen.getByPlaceholderText('Pertanyaan'), {
      target: { value: dataRadio.newQuestions[0].question },
    });
    const questionTypeSelect = screen.getByDisplayValue('Teks');
    await actTimeout(() => {
      userEvent.selectOptions(questionTypeSelect, 'RADIO');
    });

    await actTimeout(() => {
      fireEvent.click(screen.getByText('Tambah Opsi'));
    });

    await actTimeout(() => {
      const options = screen.getAllByPlaceholderText('Opsi');
      userEvent.type(options[0], dataRadio.newQuestions[0].question);
      userEvent.type(options[1], dataRadio.newQuestions[1].question);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });

  it('should save checkbox question successfully', async () => {
    const dataCheckbox: FormEditorInput = {
      ...data,
      newQuestions: [
        {
          question: 'Question',
          type: 'CHECKBOX',
          options: [{ label: 'Option 1' }, { label: 'Option 2' }],
        },
      ],
    };

    render(<FormEditor existingData={data} />);

    fireEvent.change(screen.getByDisplayValue(data.title), {
      target: { value: dataCheckbox.title },
    });
    fireEvent.change(screen.getByDisplayValue(data.description), {
      target: { value: dataCheckbox.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataCheckbox.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataCheckbox.startTime },
    });
    fireEvent.change(screen.getByPlaceholderText('Pertanyaan'), {
      target: { value: dataCheckbox.newQuestions[0].question },
    });
    const questionTypeSelect = screen.getByDisplayValue('Teks');

    await actTimeout(() => {
      userEvent.selectOptions(questionTypeSelect, 'CHECKBOX');
    });

    await actTimeout(() => {
      fireEvent.click(screen.getByText('Tambah Opsi'));
    });

    await actTimeout(() => {
      const options = screen.getAllByPlaceholderText('Opsi');
      userEvent.type(options[0], dataCheckbox.newQuestions[0].question);
      userEvent.type(options[1], dataCheckbox.newQuestions[1].question);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });

  it('should save range question successfully', async () => {
    const dataRange: FormEditorInput = {
      ...data,
      newQuestions: [
        {
          question: 'Question',
          type: 'RANGE',
          rangeFrom: 1,
          rangeTo: 3,
        },
      ],
    };

    render(<FormEditor existingData={data} />);

    fireEvent.change(screen.getByDisplayValue(data.title), {
      target: { value: dataRange.title },
    });
    fireEvent.change(screen.getByDisplayValue(data.description), {
      target: { value: dataRange.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataRange.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataRange.startTime },
    });
    fireEvent.change(screen.getByPlaceholderText('Pertanyaan'), {
      target: { value: dataRange.newQuestions[0].question },
    });
    const questionTypeSelect = screen.getByDisplayValue('Teks');

    await actTimeout(() => {
      userEvent.selectOptions(questionTypeSelect, 'RANGE');
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });

  it('should add question successfully', async () => {
    const dataAddQuestion: FormEditorInput = {
      ...data,
      newQuestions: [
        {
          question: 'Question 1',
          type: 'TEXT',
        },
        {
          question: 'Question 2',
          type: 'TEXT',
        },
      ],
    };

    render(<FormEditor existingData={data} id="uuid" />);

    fireEvent.change(screen.getByDisplayValue(data.description), {
      target: { value: dataAddQuestion.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataAddQuestion.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataAddQuestion.startTime },
    });

    fireEvent.click(screen.getByText('Tambah Pertanyaan'));

    await waitFor(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });
});
