import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
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

  const [writtenMarks1, setWrittenMarks1] = useState([]); //button numbers marked by player1
  const [writtenMarks2, setWrittenMarks2] = useState([]); //button numbers marked by player2

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

  const Winner = isWin1 ? "Player1" : isWin2 ? "Player2" : "none";

  return (
    <>
      <section className="headSection">
        <div className="theme">
          <i className="fa-solid fa-sun"></i>
        </div>
        <div className="heading">
          <div>X O</div>
          <div>Tic. Tac. Win.</div>
        </div>
      </section>
      <main>
        {Winner != "none" ? <Confetti /> : null}
        {Winner != "none" ? (
          <section className="winMsg">
            <div>{`🎊 ${Winner} is the Winner 🎊`}</div>
          </section>
        ) : null}
        <section className="playerStatus">
          <h3
            className={player ? "p1" : ""}
            style={player ? { opacity: 1 } : { opacity: 0.3 }}
          >
            <span className="X">X</span> Player1
          </h3>
          <hr></hr>
          <h3
            className={player === false ? "p2" : ""}
            style={player === false ? { opacity: 1 } : { opacity: 0.3 }}
          >
            <span className="O">O</span> Player2
          </h3>
        </section>
        <hr></hr>

        <section className="ticSec">{renderTicButtons}</section>
      </main>
      <footer>
        <a href="https://github.com/akrsh47" target="_blank">
          👽 Akarsh
        </a>
      </footer>
    </>
  );
}

export default App;
