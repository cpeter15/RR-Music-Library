import './App.css';
import { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

function App() {
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')
  let searchInput = useRef('')

  const handleSearch = (e, term) => {
    e.preventDefault()
    fetch(`https://itunes.apple.com/search?term=${term}`)
      .then(response => response.json())
      .then(resData => {
        if (resData.results.length > 0) {
          return setData(resData.results)
        } else {
          return setMessage('Not Found.')
        }
      })
      .catch(err => setMessage('An Error has Occurred!'))
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Route exact path="/">
          <SearchContext.Provider value={{ term: searchInput, handleSearch: handleSearch }}>
            <SearchBar />
          </SearchContext.Provider>
          <DataContext.Provider value={data}>
            <Gallery />
          </DataContext.Provider>
        </Route>
        <Route path="/album/:id">
          <AlbumView term={searchInput} />
        </Route>
        <Route path="/artist/:id">
          <ArtistView term={searchInput} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
