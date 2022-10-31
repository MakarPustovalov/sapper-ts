import React, { useEffect, useState } from "react";
import style from "./Field.module.sass";
import { FC } from "react";
import Tile, { TileState } from "../Tile/Tile";
import getPlainList from "../../utils/getPlainList";

interface FieldProps {
  rows: number;
  columns: number;
  bombs: number;
  onWin: () => void;
  onLose: () => void;
  locked: boolean;
}
interface TileObj {
  id: string;
  revealed: boolean;
  mined: boolean;
  bombCount: number;
}

const Field: FC<FieldProps> = ({
  rows,
  columns,
  bombs,
  onWin,
  onLose,
  locked,
}) => {
  const [rowsList, setRowsList] = useState<Array<Array<TileObj>>>([]);
  /*
   *  [[{
   *   id: string;
   *   revealed: boolean;
   *   mined: boolean;
   *   bombCount: number;
   *  }]]
   */

  // __________
  // UTILS
  // __________

  const generateRandomId = (arr: string[]): string => {
    let a = Math.floor(Math.random() * (rows - 1));
    let b = Math.floor(Math.random() * (columns - 1));
    let id = `${a}${b}`;
    if (arr.includes(id)) return generateRandomId(arr);
    else return id;
  };

  const generateBombs = (bombs: number): string[] => {
    const arr: string[] = [];
    for (let i = 0; i < bombs; i++) {
      let id = generateRandomId(arr);
      arr.push(id);
    }
    return arr;
  };

  const generateTiles = (
    rows: number,
    columns: number,
    bombIds: Array<string>
  ): void => {
    let rowsArr: Array<Array<TileObj>> = [];
    for (let i = 0; i < rows; i++) {
      // generate rows
      let columnsArr: Array<TileObj> = [];
      for (let j = 0; j < columns; j++) {
        // generate columns (tiles)
        let id = `${i}${j}`;
        columnsArr.push({
          id,
          revealed: false,
          mined: bombIds.includes(id),
          bombCount: 0,
        });
      }
      rowsArr.push(columnsArr);
    }
    setRowsList(rowsArr);
  };

  const getTileById = (
    id: string,
    list: Array<Array<TileObj>>
  ): TileObj | null => getPlainList(list).find((el) => el.id === id);

  const getAdjacentBombsNumber = (
    id: string,
    rowsList: Array<Array<TileObj>>
  ): number => {
    let res: number = 0;
    let row = Number(id[0]);
    let col = Number(id[1]);

    if (getTileById(`${row - 1}${col - 1}`, rowsList)?.mined) res++;
    if (getTileById(`${row - 1}${col}`, rowsList)?.mined) res++;
    if (getTileById(`${row - 1}${col + 1}`, rowsList)?.mined) res++;
    if (getTileById(`${row}${col - 1}`, rowsList)?.mined) res++;
    if (getTileById(`${row}${col + 1}`, rowsList)?.mined) res++;
    if (getTileById(`${row + 1}${col - 1}`, rowsList)?.mined) res++;
    if (getTileById(`${row + 1}${col}`, rowsList)?.mined) res++;
    if (getTileById(`${row + 1}${col + 1}`, rowsList)?.mined) res++;

    return res;
  };

  const updateTilesList = (
    id: string,
    rowsList: Array<Array<TileObj>>,
    bombCount: number
  ): void => {
    let rowIndex = Number(id[0]);
    let colIndex = Number(id[1]);
    let row = rowsList[rowIndex];
    let col = row[colIndex];
    let newTile = { ...col, revealed: true, bombCount };
    let newRow = [];
    let newArr = [];

    for (let i = 0; i < row.length; i++) {
      if (i === colIndex) newRow.push(newTile);
      else newRow.push(row[i]);
    }

    for (let i = 0; i < rowsList.length; i++) {
      if (i === rowIndex) newArr.push(newRow);
      else newArr.push(rowsList[i]);
    }
    setRowsList(newArr);
  };

  const checkIsAllRevealed = (list: Array<TileObj>) =>
    list.length > 0 &&
    list.filter((el) => !el.mined && !el.revealed).length < 1;

  // __________
  // EFFECTS
  // __________

  useEffect(() => {
    generateTiles(rows, columns, generateBombs(bombs));
  }, [bombs]);

  useEffect(() => {
    if (checkIsAllRevealed(getPlainList(rowsList))) onWin();
  }, [rowsList]);

  // __________
  // HANDLERS
  // __________

  const tileClickHandler = (id: string, mined: boolean): void => {
    if (locked) return;
    if (mined) onLose();
    else {
      updateTilesList(id, rowsList, getAdjacentBombsNumber(id, rowsList));
    }
  };

  return (
    <div className={style.field}>
      {rowsList.map((el) => (
        <div
          className={style.fieldRow}
          key={el[0].id + "-" + el[el.length - 1].id}
        >
          {el.map(({ id, mined, revealed, bombCount }) => (
            <Tile
              key={id}
              id={id}
              mined={mined}
              onClick={tileClickHandler}
              state={revealed ? TileState.revealed : undefined}
              bombCount={bombCount}
              locked={locked}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Field;
