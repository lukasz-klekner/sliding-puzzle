const tiles: NodeListOf<HTMLDivElement> = document.querySelectorAll(".tile");
const gameBoard: HTMLDivElement = document.querySelector("#game-board");

const gameState = [
  [tiles[0], tiles[1], tiles[2]],
  [tiles[3], tiles[4], tiles[5]],
  [tiles[6], tiles[7], tiles[8]],
];

const render = (gameBoard: HTMLDivElement, gameState: HTMLDivElement[][]) => {
  gameState.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      tile.style.top = `${rowIndex*100}px`
      tile.style.left = `${colIndex*100}px`
      gameBoard.appendChild(tile);
    });
  });
};

const moveElement = (element1, element2) => {
  let temp1, temp2

  temp1 = element1.style.top
  temp2 = element1.style.left

  element1.style.top = element2.style.top
  element1.style.left = element2.style.left

  element2.style.top = temp1
  element2.style.left = temp2
}

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

    moveElement(gameState[x][y], gameState[emptyX][emptyY])

  }

  render(gameBoard, gameState);
});

render(gameBoard, gameState)