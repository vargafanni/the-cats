import React from 'react';
import { render, screen } from '@testing-library/react';
import CatsContainer from './CatsContainer';
import { ICat } from '../interfaces/catServiceInterfaces';
import { getCatImages } from '../service/catService';

const mockCats: ICat[] = [{
    id: 'cat1',
    url: '/url',
    breeds: []
},{
    id: 'cat2',
    url: '/url',
    breeds: []
},{
    id: 'cat3',
    url: '/url',
    breeds: []
}]
jest.mock('../service/catService',() => ({
    getCatImages: (page:number, setCats:(cats:ICat[])=>void, noMore:(noMore:boolean)=> void) => {
       setCats(mockCats);
       noMore(true);
    }}))

test('renders cats', () => {
    
    render(<CatsContainer breeds='' />);
    const container = screen.getByTestId('cats-container');
    expect(container).not.toBeEmptyDOMElement();
});

test('renders cats with no more message', () => {
    
    render(<CatsContainer breeds='' />);
    const noMore = screen.getByTestId('no-more-cats');
    expect(noMore).toBeInTheDocument();
});