import { useCallback, useState } from "react";
import "./App.css";
import Field from "./components/Field/Field";

enum GameState {
  normal = "normal",
  lost = "lost",
  won = "won",
}

function App() {
  const [bombs, setBombs] = useState(10);
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [gameId, setGameId] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.normal);

  const reset = () => {
    setGameId(gameId + 1);
    setGameState(GameState.normal);
  };

  return (
    <div className="App">
      <Field
        key={gameId}
        bombs={bombs}
        rows={rows}
        columns={columns}
        onWin={() => setGameState(GameState.won)}
        onLose={() => setGameState(GameState.lost)}
        locked={gameState === GameState.won || gameState === GameState.lost}
      />
      {gameState !== GameState.normal && (
        <p>
          {gameState === GameState.lost
            ? "Game over!"
            : gameState === GameState.won && "You won!"}
        </p>
      )}
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

export default App;
