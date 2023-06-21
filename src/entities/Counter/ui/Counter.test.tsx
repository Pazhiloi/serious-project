/* eslint-disable i18next/no-literal-string */
import { fireEvent, screen } from '@testing-library/react';
import { Counter } from './Counter';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { userEvent } from '@storybook/testing-library';
describe('Counter', () => {
  test('test render', () => {
    componentRender(<Counter />, {
      initialState: {counter: {value: 10}}
    });
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });
  test('increment', () => {
    componentRender(<Counter />, {
      initialState: {counter: {value: 10}}
    });
    userEvent.click(screen.getByTestId('increment-btn'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });
  test('decrement', () => {
    componentRender(<Counter />, {
      initialState: {counter: {value: 10}}
    });
    userEvent.click(screen.getByTestId('decrement-btn'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
