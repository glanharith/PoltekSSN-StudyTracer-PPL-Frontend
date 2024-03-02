import { render, screen } from '@testing-library/react';
import { CustomInput } from '.';
import { FormInputProps } from './interface';

describe('CustomInput', () => {
  it('should render text input correctly', () => {
    const props: FormInputProps = {
      name: 'username',
      label: 'Username',
      placeholder: 'Username',
      register: {
        name: 'username',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        ref: jest.fn(),
      },
    };

    render(<CustomInput {...props} />);

    expect(screen.getByPlaceholderText(props.placeholder!)).toBeInTheDocument();
    expect(screen.getByLabelText(props.label!)).toBeInTheDocument();
  });

  it('should render select input correctly', () => {
    const props: FormInputProps = {
      name: 'select',
      label: 'Select',
      placeholder: 'Select Options',
      type: 'select',
      selectOptions: (
        <>
          <option value={'option1'}>Option 1</option>
          <option value={'option2'}>Option 2</option>
        </>
      ),
      register: {
        name: 'select',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        ref: jest.fn(),
      },
    };

    render(<CustomInput {...props} />);

    expect(screen.getByLabelText(props.label!)).toBeInTheDocument();
    expect(screen.getByText(props.placeholder!)).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render left addon correctly', () => {
    const props: FormInputProps = {
      name: 'username',
      label: 'Username',
      placeholder: 'Username',
      leftAddon: '$',
      register: {
        name: 'username',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        ref: jest.fn(),
      },
    };

    render(<CustomInput {...props} />);

    expect(screen.getByText(props.leftAddon!)).toBeInTheDocument();
  });
});
