"use client";

import React, { useState } from "react";

const TicTacToe: React.FC = () => {
  const [cuadro, setCuadros] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    if (calculateWinner(cuadro) || cuadro[index]) {
      return;
    }

    const newSquares = cuadro.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setCuadros(newSquares);
    setXIsNext(!xIsNext);
  };


  const handleRestart = () => {
    setCuadros(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderCuadrado = (index: number) => (
    <button className="square" onClick={() => handleClick(index)}>
      {cuadro[index]}
    </button>
  );

  const winner = calculateWinner(cuadro);
  let status;

  if (winner) {
    status = `Ganador es: ${winner}`;
  } else if (cuadro.every((square) => square !== null)) {
    status = "Es un empate!";
  } else {
    status = `Siguiente jugador: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board square-board">
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className="board-row">
            {Array.from({ length: 3 }, (_, col) =>
              renderCuadrado(row * 3 + col)
            )}
          </div>
          //Aca agrego el boton para       
        ))}
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
};

// aqui calculamos al ganador
const calculateWinner = (cuadrado: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (
      cuadrado[a] &&
      cuadrado[a] === cuadrado[b] &&
      cuadrado[a] === cuadrado[c]
    ) {
      return cuadrado[a];
    }
  }

  return null;
};

export default TicTacToe;
