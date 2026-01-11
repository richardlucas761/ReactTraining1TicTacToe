import { useState } from 'react';

/**
 * Display a square in the grid and change it's value on click.
 * @param {any} param0 TODO: should this be "any" here when we're only ever expecting "X" or "O"?
 * @returns a square button.
 */
function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

/**
 * A tic-tac-toe board.
 * @returns A tic-tac-toe board.
 */
export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            // Square already has a value or someone has won the game
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const filled = allSquaresFilled(squares);

    const winner = calculateWinner(squares);

    let status;

    if (winner) {
        status = "Winner: " + winner;
    } else if (!winner && filled) {
        status = "No winner!"
    } else if (!filled) {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
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

/**
 * Determine if all squares are now filled.
 * @param {any} squares a list of squares to check if all squares are now filled.
 */
function allSquaresFilled(squares) {
    for (let i = 0; i < squares.length; i++) {
        // If there is at least one square which is not null then the squares are not filled.
        if (squares[i] === null) {
            return false;
        }
    }

    // We didn't find any non-null squares so all squares all filled.
    return true;
}

/**
 * Calculate if anyone has won the game based on a set of squares passed into the function.
 * @param {any} squares A list of squares to check to see if anyone was won.
 * @returns Which player has won or null to indicate no-one has won the game yet.
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}