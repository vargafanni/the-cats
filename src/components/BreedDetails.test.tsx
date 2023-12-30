import React from 'react';
import { render } from '@testing-library/react';
import BreedDetailsContainer from './BreedDetails';
import { IBreed } from '../interfaces/catServiceInterfaces';

test('renders nothing when no given breeds', () => {
    const { container } = render(<BreedDetailsContainer />);

    expect(container.firstChild).toBeEmptyDOMElement();
});

test('renders BreedDetail when given breeds', () => {
    const breeds: IBreed[] = [{
        id: 'breedId',
        name: 'breed',
        description: 'breed details',
        temperament: 'breed temperament',
        origin: 'breed origin'
    }]
    const { container } = render(<BreedDetailsContainer breeds={breeds}/>);

    expect(container.firstChild).toHaveTextContent('breed details');
});