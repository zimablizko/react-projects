import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((wasEditing) => !wasEditing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameBlock = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameBlock = <input type="text" required value={playerName} onChange={handlePlayerNameChange} />;
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerNameBlock}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
