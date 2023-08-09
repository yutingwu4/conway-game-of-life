import useBoard from './hooks/useBoard';

function App() {
const {board, toggleCell} = useBoard(5, 5, false); 

// create play vs. pause button
  // state variable: is the game executing?

return (
    <table>
      {board.map((row, y) => <tr>{row.map((cell, x) => <td onClick={() => toggleCell(x, y)}>{cell ? 1 : 0}</td>)}</tr>)}
    </table>
  )
}

export default App;
