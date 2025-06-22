// Summary: There are two components, Board and Square.
// Board is made up of 9 Square components that uses usestate to store their state in an array.
// They are assigned a className to order them into a board
// Square displays an "X" or "O" when you click it
//

import { useState } from "react"; // import's usestate variable hook

// You have a square that displays an "X" or "O" when you click it - game logic
// Because each of them are blank square buttons at first, each square is just
// formatted as a board, using CSS! 3 squares per row. - css
// The Square function allows you to create multiple Square components to create the Board. - vizualize
// Squares start off blank and you change them to either an X or an O by clicking on empties.
// The Square component takes two props from the upper Board component, and uses them
// to display an X or an O in the square you clicked

// Take 2 props that define the value displayed in the square, an X or O,

// A square Button that changes its value when you click it via props
function Square({ value, onSquareClick }) {
  // Square - a Button Component styld as a 2D square
  return (
    // returns a button
    <button
      className="square" // Shaped using the "square" className
      onClick={onSquareClick} // When clicked, changes the value of the button text
    >
      {value} // Value is a prop
    </button>
  );
}

// main component; export so it is globally available
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); // state for turns
  const [squares, setSquares] = useState(Array(9).fill(null)); // state of board

  // changes from X to O
  // handles repetative clicks
  // tests winner logic
  // sets both state varibles
  // xIsNext changes players
  // squares stores board squares array
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      // if square[i] is true then do nothing
      // ^ or if there is a winner do nothing
      return;
    }
    const nextSquares = squares.slice(); // creates copy of board
    if (xIsNext) {
      // checks if it's X's turn
      nextSquares[i] = "X"; // if true then X goes
    } else {
      nextSquares[i] = "O"; // if false then it is O payer turn
    }
    setSquares(nextSquares); // updates all squares with "lifting state up" logic
    setXIsNext(!xIsNext); // updates who the next player is
  }

  // calculates winner
  function calculateWinner(squares) {
    // takes all squares current states (the board)
    const lines = [
      // combinations of winning squares
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      //for loop that matches the lines array with players turn - logic
      const [a, b, c] = lines[i]; // creates 3 destructured variables
      if (
        // compares squares at the indexes of the lines (winning combos)
        squares[a] && // if square at index a exists and
        squares[a] === squares[b] && // it equals the square at index b
        squares[a] === squares[c] // and index a value also equals the value at index c
      ) {
        return squares[a]; // then return the value of the index a. i.e. return X || O
      }
    }
    return null; // if none of the squares are winning combo's do nothing
  }

  const winner = calculateWinner(squares); // calls calculatewinner
  let status; // status of winner
  if (winner) {
    status = "Winner: " + winner; // prints winner
  } else {
    // if no winner
    status = "Next player: " + (xIsNext ? "X" : "O"); // displays who's turn it is
  }

  return (
    // every component needs to return something. this is returning the board
    <>
      <div className="status">{status}</div> // status is whos turn it is or if
      there is a winner
      <div className="board-row">
        {" "}
        // aligns the squares into 3 per row
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> //
        Square component that recieves props from Board component. indicating
        which square index to change the value and onClick instructions
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
