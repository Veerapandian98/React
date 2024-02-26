export default function GameBoard({onSquareSelected, board}) {
    
    // const [gameBoard, updateGameBoard] = useState(initialBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     updateGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerBoard => [...innerBoard])];
    //         updatedBoard[rowIndex][colIndex] = activeSymbol;
    //         return updatedBoard;
    //     })
    //     onSquareSelected();
    // }   

    return (
        <ol id="game-board">
            {board.map((row,rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSquareSelected(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                            {playerSymbol}
                        </button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}