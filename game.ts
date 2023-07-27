const tiles: NodeListOf<HTMLDivElement> = document.querySelectorAll(".tile");
const gameBoard: HTMLDivElement = document.querySelector("#game-board");

const gameState = [
  [tiles[0], tiles[1], tiles[2]],
  [tiles[3], tiles[4], tiles[5]],
  [tiles[6], tiles[7], tiles[8]],
];

const render = (gameBoard: HTMLDivElement, gameState: HTMLDivElement[][]) => {
  gameState.forEach((row) => {
    row.forEach((col) => {
      gameBoard.appendChild(col);
    });
  });
};

gameBoard.addEventListener("click", (event: Event) => {
  const target = event.target;

  let x: number, y: number;

  gameState.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === target) {
        x = rowIndex;
        y = colIndex;
      }
    });
  });

  let emptyX: number, emptyY: number;
  gameState.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col.innerHTML === "") {
        emptyX = rowIndex;
        emptyY = colIndex;
      }
    });
  });

  if (y === emptyY && (x + 1 === emptyX || x - 1 === emptyX) || x === emptyX && (y + 1 === emptyY || y - 1 === emptyY)) {
    const temp = gameState[x][y];
    gameState[x][y] = gameState[emptyX][emptyY];
    gameState[emptyX][emptyY] = temp;
  }

  render(gameBoard, gameState);
});
