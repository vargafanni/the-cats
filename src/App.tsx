import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { IBreed } from './interfaces/catServiceInterfaces';
import { getBreeds } from './service/catService';
import CatsContainer from './components/CatsContainer';
import { Autocomplete, Divider, TextField } from '@mui/material';
import BreedDetailsContainer from './components/BreedDetails';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [breeds, setBreeds] = useState<IBreed[]>();
  const [searchedBreeds, setSearchedBreeds] = useState<{ label: string, id: string }[]>([]);

  //fetch breeds info
  useEffect(() => {
    getBreeds(setBreeds);
  }, [])

  //update searched breeds on selector change
  const onSearch = (searchValues: { label: string, id: string }[]) => {
    setSearchedBreeds(searchValues)
  }

  return (
    <div className="App">

      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>THE CATS</h1>
      </header>
      <main>
        <ErrorBoundary>
          <div className='breed-selector-container'>
            <Autocomplete
              disablePortal
              options={breeds?.map(breed => ({ label: breed.name, id: breed.id })) ?? []}
              sx={{ maxWidth: "100vmin", minWidth: "30vmin" }}
              renderInput={(params) => <TextField {...params} label="Breeds" />}
              onChange={(e, values) => { onSearch(values) }}
              value={searchedBreeds}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              multiple
            />
          </div>
          <div className='results-container'>
            {searchedBreeds.length > 0 &&
              <BreedDetailsContainer breeds={breeds?.filter((breed) => searchedBreeds.find((sb) => sb.id === breed.id))} />
            }
            <Divider />
            <CatsContainer breeds={searchedBreeds.map(breed => breed.id).join(',')} />
          </div>
        </ErrorBoundary>
      </main>
      <footer>@Fanni Galgoczine Varga</footer>
    </div>
  );
}

export default App;
