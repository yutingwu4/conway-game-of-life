import { useState, useCallback, useEffect } from "react";
import useBoard from "./hooks/useBoard";

const dirs = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

const width = 50;
const height = 50;

const inBounds = (x: number, y: number) => {
  return x >= 0 && x < width && y >= 0 && y < height;
};

function App() {
  const { board, toggleCell, setBoard, resetBoard } = useBoard(
    width,
    height,
    false
  );
  const [gameOn, setGameOn] = useState(false);

  useEffect(() => {
    if (gameOn) {
      const intervalId = setInterval(() => {
        // update board
        setBoard((prevBoard) => {
          return prevBoard.map((row, y) =>
            row.map((cell, x) => {
              const liveNbrs = dirs.reduce(
                (acc: number, [xOffset, yOffset]: number[]) => {
                  const targetX = x + xOffset;
                  const targetY = y + yOffset;

                  if (inBounds(targetX, targetY) && prevBoard[targetY][targetX])
                    return acc + 1;
                  else return acc;
                },
                0
              );
              /* apply rules:
              1. Any live cell with two or three live neighbors survives.
              2. Any dead cell with exactly three live neighbors becomes a live cell.
              3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
              */
              return (
                (liveNbrs >= 2 && liveNbrs < 4 && cell) ||
                (!cell && liveNbrs === 3)
              );
            })
          );
        });
      }, 500);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameOn, setBoard]);

  const toggleGameOn = useCallback(() => {
    setGameOn((prevOn) => !prevOn);
  }, []);

  const resetGame = useCallback(() => {
    setGameOn(false);
    resetBoard();
  }, [resetBoard]);

  return (
    <>
      <table>
        {board.map((row, y) => (
          <tr>
            {row.map((cell, x) => (
              <td
                className={`cell ${cell ? "live" : "dead"}`}
                onClick={() => toggleCell(x, y)}
              ></td>
            ))}
          </tr>
        ))}
      </table>
      <div className='buttons'>
        <button onClick={toggleGameOn}>{gameOn ? "Pause" : "Play"}</button>
        <button onClick={resetGame}>Reset</button>
      </div>
    </>
  );
}

export default App;
