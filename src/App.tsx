import { useState } from "react";
import "./App.css";
import Field from "./components/Field/Field";

function App() {
  const [bombs, setBombs] = useState(10);
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);

  const tileClickHandler = (id: number, mined: boolean): void => {};

  return (
    <div className="App">
      <Field
        bombs={bombs}
        rows={rows}
        columns={columns}
        onTileClick={tileClickHandler}
      />
    </div>
  );
}

export default App;
