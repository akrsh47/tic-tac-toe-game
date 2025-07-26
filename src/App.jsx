import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [ticButtons, setTicButtons] = useState(Array(9).fill(""));

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

  const [writtenMarks, setWrittenMarks] = useState([]);

  function handleButtonMark(indx) {
    setWrittenMarks((prevItem) =>
      prevItem.includes(indx) ? prevItem : [...prevItem, indx]
    );

    setTicButtons((prevItem) => {
      const updated = [...prevItem];
      updated[indx] = "X";

      return updated;
    });
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
  const isWin = winningSet.some((combination) =>
    combination.every((item) => writtenMarks.includes(item))
  );

  console.log(isWin);
  /*  useEffect(() => {
    console.log(isWin, "isWin");
    console.log(writtenMarks, "writtenmarks");
  }, [writtenMarks]); */

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
