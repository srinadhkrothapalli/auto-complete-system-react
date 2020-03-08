import React from 'react';
import axios from 'axios';
import SearchSuggestions from './SearchSuggestions/SearchSuggestions';
import Pill from './Pill/Pill';
import './App.css';


const apiKey = '9adcdf48'
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      inputValue: '',
      searchSuggestions: [],
      selectedMovies: [],
      searchSuggestionError: ''
    }
    this.getMovies = this.debounce(this.getMovies.bind(this), 200);
  }

  // Function to handle change from input field
  inputChangeHandler = (e) => {
    let inputValue = e.target.value;
    this.setState({
      inputValue
    }, () => {
      this.getMovies();
    });
  }

  //Function to getMovies from omdbapi based on user input
  getMovies = () => {
    let { inputValue } = this.state;
    axios.get(`http://www.omdbapi.com/?apikey=`+apiKey+`&s=`+inputValue)
    .then((res)=>{
      let searchSuggestions = [];
      let searchSuggestionError = false;
      // If there is large list based on user input we are recieving Response False with no suggestions so handling it
      if(res.data.Response && res.data.Response === "False") {
        searchSuggestionError = true;
      } else{
        searchSuggestions = res.data.Search;
      }
      this.setState({
        searchSuggestionError,
        searchSuggestions
      });
    })
    .catch((err) => {
      let searchSuggestionError = false;
      this.setState({
        searchSuggestionError
      })
    });
  }

  //Function to update selected movies by user that needs to be displayed as pills
  updateSelectedMovies = (selectedMovie) => {
    let movies = [...this.state.selectedMovies];
    let moviePresent = false;
    movies.forEach((movie) => {
      if (movie.imdbID === selectedMovie.imdbID) {
        moviePresent = true;
      }
    });
    if (moviePresent || movies.length === 5) {
      return;
    }
    let selectedMovies = movies.concat(selectedMovie);
    this.setState({
      selectedMovies
    });
  }

  //Function to handle delete pill action from user
  deleteSelectedMovie = (index) => {
    let  selectedMovies  = [...this.state.selectedMovies];
    selectedMovies.splice(index, 1);
    this.setState({
      selectedMovies
    });
  }

  //Function to clear suggestions when user clicks outside autocomplete/searchsuggestions component
  clearSuggestions = () => {
    let searchSuggestions = [];
    this.setState({
      searchSuggestions
    })
  }

  //Function to implement debounce functionality so that we don't make calls to api frequenetly
  debounce = (func, delay) => {
    let debounceTimer
    return function () {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer
        = setTimeout(() => func.apply(context, args), delay)
    }
  }

  render() {
    let { inputValue, searchSuggestions, selectedMovies, searchSuggestionError } = this.state;
    return (
      <div className="App" onClick={this.clearSuggestions}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
          <Pill selectedMovies={selectedMovies} deleteSelectedMovie={this.deleteSelectedMovie}
            inputValue={inputValue} inputChangeHandler={this.inputChangeHandler} />
          <SearchSuggestions searchSuggestions={searchSuggestions} updateSelectedMovies={this.updateSelectedMovies}
            searchSuggestionError = {searchSuggestionError}/>
        </div>
      </div>
    );
  }
}

export default App;
