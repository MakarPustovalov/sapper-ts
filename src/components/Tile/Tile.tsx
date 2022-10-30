import React, { FC } from "react";
import style from "./Tile.module.sass";

export enum TileState {
  revealed = "revealed",
  flagged = "flagged",
  normal = "normal",
}

interface TileProps {
  id: number;
  state?: TileState;
  mined: boolean;
  onClick: (id: number, mined: boolean) => void;
}

const Tile: FC<TileProps> = ({
  id,
  state = TileState.normal,
  mined,
  onClick,
}) => {
  return <div className={style.tile}></div>;
};

export default Tile;
