import { useState, useCallback } from "react";

const generateDefaultBoard = (r: number, c: number, val: boolean) => {
  return new Array(r).fill(0).map(() => new Array(c).fill(val));
};

// track current state of board
/* responsible for:
1. creating a new grid with a set number of rows and cols
2. assigning initial cell value on creation
3. retrieving and modifying value of a cell, given r and c
*/
const useBoard = (r: number, c: number, initialVal: boolean) => {
  const [board, setBoard] = useState(generateDefaultBoard(r, c, initialVal));

  const toggleCell = useCallback((targetX: number, targetY: number) => {
    setBoard((prevBoard) => {
      return prevBoard.map((row, y) =>
        row.map((cell, x) => (x == targetX && y == targetY ? !cell : cell))
      );
    });
  }, []);

  const resetBoard = useCallback(() => {
    setBoard(generateDefaultBoard(r, c, initialVal));
  }, [r, c, initialVal]);

  return { board, toggleCell, setBoard, resetBoard };
};

export default useBoard;
