import React from 'react';
import './Pill.css';

function Pill(props) {
    return (
        <div className="AutoSuggest">
          {props.selectedMovies.map((movie, index) => {
            return (
              <div className="Pill" key={movie.imdbID}>
                <div className= "PillText">
                  {movie.Title}
                </div>
                <div className="PillClose" onClick={() => props.deleteSelectedMovie(index)}>X</div>
              </div>
            )
          })}
          <input className="TextInput" type="text" value={props.inputValue} onChange={props.inputChangeHandler}></input>
        </div>
    )
}

export default Pill;
