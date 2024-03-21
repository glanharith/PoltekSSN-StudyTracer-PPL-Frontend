import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormBuilder } from '.';
import { FormBuilderInput } from './interface';

const actTimeout = async (f: () => void) =>
  await act(async () => {
    setTimeout(f, 1000);
  });

describe('GenericFormTextInput', () => {
  const data: FormBuilderInput = {
    title: 'Title',
    description: 'Description',
    type: 'CAREER',
    startTime: new Date(2024, 0, 1),
    endTime: new Date(2024, 1, 1),
    questions: [],
  };

  it('should render form builder correctly', () => {
    render(<FormBuilder />);

    expect(screen.getByPlaceholderText('Judul Survey')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Deskripsi')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipe Survey')).toBeInTheDocument();
    expect(screen.getByLabelText('Tanggal Mulai')).toBeInTheDocument();
    expect(screen.getByLabelText('Tanggal Selesai')).toBeInTheDocument();
    expect(screen.getByText('Simpan')).toBeInTheDocument();
  });

  it('should save text question successfully', async () => {
    const dataText = {
      ...data,
      questions: [{ question: 'Question', type: 'TEXT' }],
    };

    render(<FormBuilder />);

    fireEvent.change(screen.getByPlaceholderText('Judul Survey'), {
      target: { value: dataText.title },
    });
    fireEvent.change(screen.getByPlaceholderText('Deskripsi'), {
      target: { value: dataText.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataText.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataText.startTime },
    });
    fireEvent.change(screen.getByPlaceholderText('Pertanyaan'), {
      target: { value: dataText.questions[0].question },
    });

    await actTimeout(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });

  it('should save radio question successfully', async () => {
    const dataRadio: FormBuilderInput = {
      ...data,
      questions: [
        {
          question: 'Question',
          type: 'RADIO',
          options: [{ label: 'Option 1' }, { label: 'Option 2' }],
        },
      ],
    };

    render(<FormBuilder />);

    fireEvent.change(screen.getByPlaceholderText('Judul Survey'), {
      target: { value: dataRadio.title },
    });
    fireEvent.change(screen.getByPlaceholderText('Deskripsi'), {
      target: { value: dataRadio.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataRadio.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataRadio.startTime },
    });
    fireEvent.change(screen.getByPlaceholderText('Pertanyaan'), {
      target: { value: dataRadio.questions[0].question },
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
      userEvent.type(options[0], dataRadio.questions[0].question);
      userEvent.type(options[1], dataRadio.questions[1].question);
    });

    await actTimeout(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });

  it('should save checkbox question successfully', async () => {
    const dataCheckbox: FormBuilderInput = {
      ...data,
      questions: [
        {
          question: 'Question',
          type: 'CHECKBOX',
          options: [{ label: 'Option 1' }, { label: 'Option 2' }],
        },
      ],
    };

    render(<FormBuilder />);

    fireEvent.change(screen.getByPlaceholderText('Judul Survey'), {
      target: { value: dataCheckbox.title },
    });
    fireEvent.change(screen.getByPlaceholderText('Deskripsi'), {
      target: { value: dataCheckbox.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataCheckbox.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataCheckbox.startTime },
    });
    fireEvent.change(screen.getByPlaceholderText('Pertanyaan'), {
      target: { value: dataCheckbox.questions[0].question },
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
      userEvent.type(options[0], dataCheckbox.questions[0].question);
      userEvent.type(options[1], dataCheckbox.questions[1].question);
    });

    await actTimeout(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });

  it('should save range question successfully', async () => {
    const dataRange: FormBuilderInput = {
      ...data,
      questions: [
        {
          question: 'Question',
          type: 'RANGE',
          rangeFrom: 1,
          rangeTo: 3,
        },
      ],
    };

    render(<FormBuilder />);

    fireEvent.change(screen.getByPlaceholderText('Judul Survey'), {
      target: { value: dataRange.title },
    });
    fireEvent.change(screen.getByPlaceholderText('Deskripsi'), {
      target: { value: dataRange.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataRange.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataRange.startTime },
    });
    fireEvent.change(screen.getByPlaceholderText('Pertanyaan'), {
      target: { value: dataRange.questions[0].question },
    });
    const questionTypeSelect = screen.getByDisplayValue('Teks');

    await actTimeout(() => {
      userEvent.selectOptions(questionTypeSelect, 'RANGE');
    });

    await actTimeout(() => {
      fireEvent.click(screen.getByText('Simpan'));
    });
  });

  it('should add question successfully', async () => {
    const dataAddQuestion: FormBuilderInput = {
      ...data,
      questions: [
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

    render(<FormBuilder />);

    fireEvent.change(screen.getByPlaceholderText('Judul Survey'), {
      target: { value: dataAddQuestion.title },
    });
    fireEvent.change(screen.getByPlaceholderText('Deskripsi'), {
      target: { value: dataAddQuestion.description },
    });
    fireEvent.change(screen.getByLabelText('Tipe Survey'), {
      target: { value: dataAddQuestion.type },
    });
    fireEvent.change(screen.getByLabelText('Tanggal Mulai'), {
      target: { value: dataAddQuestion.startTime },
    });

    await actTimeout(() => {
      fireEvent.click(screen.getByText('Tambah Pertanyaan'));
    });
  });
});
