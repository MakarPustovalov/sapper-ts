import classNames from "classnames";
import React, { FC, MouseEvent, useState } from "react";
import style from "./Tile.module.sass";

export enum TileState {
  revealed = "revealed",
  flagged = "flagged",
  normal = "normal",
}

interface TileProps {
  id: string;
  state?: TileState;
  mined: boolean;
  onClick: (id: string, mined: boolean) => void;
  locked: boolean;
  bombCount: number;
}

const Tile: FC<TileProps> = ({
  id,
  state = TileState.normal,
  mined,
  onClick,
  locked,
  bombCount,
}) => {
  const [tileState, setTileState] = useState(state ?? TileState.normal);

  // Revealing handler
  const clickHandler = (id: string, mined: boolean): void => {
    if (tileState === TileState.revealed || locked) return;
    setTileState(TileState.revealed);
    onClick(id, mined);
  };

  // Flagging handler
  const rightClickHandler = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (tileState === TileState.revealed || locked) return;
    setTileState(
      tileState === TileState.normal ? TileState.flagged : TileState.normal
    );
  };

  return (
    <div
      className={classNames(style.tile, {
        [style.mined]: mined,
        [style.flagged]: tileState === TileState.flagged,
        [style.revealed]: tileState === TileState.revealed,
      })}
      onClick={() => clickHandler(id, mined)}
      onContextMenu={rightClickHandler}
    >
      {tileState === TileState.revealed && bombCount > 0 && bombCount}
    </div>
  );
};

export default Tile;
