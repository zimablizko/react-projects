export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map(({ square, player }, index) => (
        <li key={`${square.rowIndex}${square.cellIndex}`}>
          {player} selected {square.rowIndex}, {square.cellIndex}
        </li>
      ))}
    </ol>
  );
}
