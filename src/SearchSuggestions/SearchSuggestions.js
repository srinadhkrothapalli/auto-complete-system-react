import React from 'react';
import './SearchSuggestions.css';

function SearchSuggestions(props) {
    return (
        <React.Fragment>
            <div className="SearchSuggestions">
                {props.searchSuggestions.map((movie) => {
                    return (
                        <div className="SearchSuggestionList" key={movie.imdbID} onClick={() => props.updateSelectedMovies(movie)}>{movie.Title}</div>
                    )
                })}
            </div>
            {props.searchSuggestionError === true ? (
                <div className="ErrorMessage">
                    No Results Found
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default SearchSuggestions;
