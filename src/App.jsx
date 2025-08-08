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
    if (Winner === "none") {
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

  let Winner = isWin1 ? "Player1" : isWin2 ? "Player2" : "none";

  if (ticButtons.every((val) => val != "") && Winner === "none") {
    Winner = "draw";
  }

  function resetGame() {
    setWrittenMarks1([]);
    setWrittenMarks2([]);
    setPlayer(true);
    Winner = "none";
    setTicButtons(Array(9).fill(""));
  }

  const [theme, setTheme] = useState("dark");
  const root = document.documentElement;
  if (theme === "dark") {
    root.style.setProperty("--heading-text", "#fff6fc");
    root.style.setProperty("--heading-bg", "#2f0120");
    root.style.setProperty("--bg", "#50103c");
    root.style.setProperty("--brand-highlight", "#df20a3");
    root.style.setProperty("--line-highlight", "#c388b1");
    root.style.setProperty("--box-button", "#fff6fc");
    root.style.setProperty("--footer", "#c388b1");
    root.style.setProperty("--brand", "#c83599");
    root.style.setProperty("--win-color", "#35c84b");
  } else if (theme === "light") {
    root.style.setProperty("--heading-text", "#C83599");
    root.style.setProperty("--heading-bg", "#FEE8F7");
    root.style.setProperty("--bg", "#FFFFFF");
    root.style.setProperty("--brand-highlight", "#df20a3");
    root.style.setProperty("--line-highlight", "#6B4860");
    root.style.setProperty("--box-button", "#2F0120");
    root.style.setProperty("--footer", "#6B4860");
    root.style.setProperty("--brand", "#c83599");
    root.style.setProperty("--win-color", "#10701E");
  }
  function changeTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <section className="headSection">
        <button className="theme" onClick={changeTheme}>
          {theme === "dark" ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>
        <div className="heading">
          <div>X O</div>
          <div>Tic. Tac. Win.</div>
        </div>
      </section>
      <main>
        {Winner != "none" && Winner != "draw" ? (
          <Confetti numberOfPieces={100} />
        ) : null}
        {Winner != "none" ? (
          <section className="winMsg">
            {Winner != "draw" ? (
              <div>{`🎊 ${Winner} is the Winner 🎊`}</div>
            ) : (
              <div style={{ color: "#3595C8" }}>⚔️ It's a draw. ⚔️</div>
            )}
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
        {Winner != "none" ? (
          <button className="newGameBtn" onClick={resetGame}>
            Replay ?
          </button>
        ) : null}

        <footer>
          <a href="https://github.com/akrsh47" target="_blank">
            👽 Akarsh
          </a>
        </footer>
      </main>
    </>
  );
}

export default App;
