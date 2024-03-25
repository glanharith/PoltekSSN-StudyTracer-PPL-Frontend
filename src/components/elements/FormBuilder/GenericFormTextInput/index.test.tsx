import { render, screen } from '@testing-library/react';
import { GenericFormTextInputProps } from './interface';
import { GenericFormTextInput } from '.';

describe('GenericFormTextInput', () => {
  it('should render text input correctly', () => {
    const props: GenericFormTextInputProps &
      React.ComponentPropsWithoutRef<'input'> = {
      register: {
        name: 'title',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        ref: jest.fn(),
      },
      placeholder: 'Placeholder',
    };

    render(<GenericFormTextInput {...props} />);

    expect(screen.getByPlaceholderText(props.placeholder!)).toBeInTheDocument();
  });
});
