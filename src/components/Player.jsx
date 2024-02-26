import { useState } from "react"

export default function Player({initialName, symbol , isActivePlayer, handleSave}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEdit, setIsEdit] = useState(false);
    function handleClick() {
        setIsEdit(isEditing => !isEditing);
        if (isEdit) {
            handleSave(symbol, playerName);
        }
    }

    function handleOnChange(event) {
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if(isEdit) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleOnChange} />;
    }

    return (
        <li className={isActivePlayer ? 'active': undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEdit ? 'Save' : 'Edit'}</button>
        </li>
    );
}