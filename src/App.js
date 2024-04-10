import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PopularPage from './components/PopularPage/index'
import TopRatedPage from './components/TopRatedPage'
import UpComingPage from './components/UpComingPage'
import SearchQuery from './components/SearchQuery'
import { useState } from 'react';
import SearchMoviesContext from './context/SearchMoviesContext';
import MovieDetailsPage from './components/MovieDetailsPage';

const API_KEY = '601b3e252181cd2209f7592247762295'

function App() {

  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <SearchMoviesContext.Provider value = {{
      searchResponse, 
      apiStatus, 
      onTriggerSearchingQuery,
      searchInput,
      onChangeSearchInput,
    }}
    >
      <div className='d-flex flex-column'>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' Component={PopularPage}/>
            <Route exact path='/top-rated' Component={TopRatedPage}/>
            <Route exact path='/upcoming' Component={UpComingPage}/>
            <Route exact path='/search' Component={SearchQuery}/>
            <Route exact path='/movie/:id' Component={MovieDetailsPage}/>
          </Routes>
        </BrowserRouter>
      </div>
    </SearchMoviesContext.Provider>
  );
}

export default App;
