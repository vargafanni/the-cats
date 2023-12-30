import React from 'react';
import { render, screen } from '@testing-library/react';
import Cat from './Cat';

test('renders cat with no breeds', () => {
    render(<Cat id={'cat-id'} url={'cat url'} breeds={[]} />);
    const img = screen.getByAltText('Cat image cat-id');
    expect(img).toBeInTheDocument();
});

test('renders cat with breeds', () => {
    render(<Cat id={'cat-id'} url={'cat url'} breeds={[{ id: 'breed-id', name: 'breed name', description: 'breed description', temperament: 'breed temperament', origin: 'breed origin' }]} />);
    const breeds = screen.getByTestId('cat-breeds-cat-id');
    expect(breeds).not.toBeEmptyDOMElement();
});