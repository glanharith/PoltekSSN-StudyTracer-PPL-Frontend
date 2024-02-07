import { render, screen } from '@testing-library/react';
import Home from '../index';

describe('Home', () => {
  const mockData = 'Response from back end: Hello User1!';

  beforeEach(() => {
    const jsx = Home({ data: mockData });
    render(jsx);
  });

  it(`should return 'Hello World!'`, () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World!',
    );
  });

  it(`should show data fetched from the backend`, () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Hello User1!',
    );
  });
});
