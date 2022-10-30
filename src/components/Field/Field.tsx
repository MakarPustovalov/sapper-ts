import React from "react";
import style from "./Field.module.sass";
import { FC } from "react";
import Tile from "../Tile/Tile";

interface FieldProps {
  rows: number;
  columns: number;
  bombs: number;
  onTileClick: (id: number, mined: boolean) => void;
}

const Field: FC<FieldProps> = ({ rows, columns, bombs, onTileClick }) => {
  let rowsArr: Array<Array<React.ReactNode | React.ReactElement>> = [];

  for (let i = 0; i < rows; i++) {
    let columnsArr: Array<React.ReactNode | React.ReactElement> = [];
    for (let j = 0; j < columns; j++) {
      let id = Number(`${i}${j}`);
      columnsArr.push(
        <Tile key={id} id={id} mined={false} onClick={onTileClick} />
      );
    }
    rowsArr.push(columnsArr);
  }

  return (
    <div className={style.field}>
      {rowsArr.map((el) => (
        <div className={style.fieldRow}>{el}</div>
      ))}
    </div>
  );
};

export default Field;
