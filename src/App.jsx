import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [ticButtons, setTicButtons] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState(true);

  const winningSet = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [writtenMarks1, setWrittenMarks1] = useState([]);
  const [writtenMarks2, setWrittenMarks2] = useState([]);

  function handleButtonMark(indx) {
    if (player) {
      setWrittenMarks1((prevItem) =>
        prevItem.includes(indx) ? prevItem : [...prevItem, indx]
      );
    } else {
      setWrittenMarks2((prevItem) =>
        prevItem.includes(indx) ? prevItem : [...prevItem, indx]
      );
    }

    setTicButtons((prevItem) => {
      const updated = [...prevItem];

      if (player) {
        updated[indx] = "X";
      } else {
        updated[indx] = "O";
      }
      return updated;
    });
    setPlayer((prevVal) => !prevVal);
  }
  const renderTicButtons = ticButtons.map((button, index) => {
    return (
      <button
        key={index}
        className="ticButton"
        onClick={() => handleButtonMark(index)}
      >
        {button}
      </button>
    );
  });

  //isWin to check if all values in writtenMarks are there in winningSet
  const isWin1 = winningSet.some((combination) =>
    combination.every((item) => writtenMarks1.includes(item))
  );

  const isWin2 = winningSet.some((combination) =>
    combination.every((item) => writtenMarks2.includes(item))
  );

  console.log(isWin1, "player1");
  console.log(isWin2, "player2");

  return (
    <>
      <h1>XO</h1>
      <section>
        <h3>
          <span>X</span> Player 1
        </h3>
        <h3>
          <span>O</span> Player 2
        </h3>
      </section>

      <section>Game Status: Playing...</section>
      <br></br>
      <section className="ticSec">{renderTicButtons}</section>
    </>
  );
}

export default App;
