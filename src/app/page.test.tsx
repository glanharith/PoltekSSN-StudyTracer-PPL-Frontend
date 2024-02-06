import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
  it(`should return 'Hello World!'`, () => {
    render(<Page />);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello World!');
  });
});
