import "./style.css";

const cards = document.querySelectorAll(".card");
const cardBox = document.querySelector(".card-box");
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNum(0, 225)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;

cards.forEach((card) => (card.style.backgroundColor = randomColor()));

function squareCreator() {
  // prettier-ignore
  const square = { id: crypto.randomUUID(), isClicked: false, color: randomColor() };

  // cards.forEach((card) => (card.style.backgroundColor = randomColor()));

  const getSquare = () => square;
  const getId = () => square.id;
  // const setId = () =>
  //   cards.forEach((card) => card.setAttribute("data-id", square.id));
  const getIsClicked = () => square.isClicked;
  const getColor = () => square.color;

  return { getSquare, getId, getIsClicked, getColor };
}

const memoryCard = squareCreator();
console.log(memoryCard.getSquare());

// napravi funkciju create square grid
// ta fja treba raditi dve stvari
// 1. napravi x squareova (i gurni ih) u squares array (x poziva funkciji square creator)
// 2. napravi x br squareova na ekranu
// za ovo istraziti npr : how to create 16x16 grid with js
function squareManager() {
  const squares = [];

  const addToSquares = (square) => squares.push(square);
  const getSquares = () => squares;
  const shuffleSquares = () => shuffle(squares);

  return { addToSquares, getSquares, shuffleSquares };
}

cardBox.addEventListener("click", function (e) {
  if (!e.target.classList.contains("card")) return;

  e.target.setAttribute("data-id", memoryCard.getId());
  e.target.style.backgrundColor = memoryCard.getColor();
});

// Creates a default grid sized 16x16
function defaultGrid() {
  makeRows(16);
  makeColumns(16);
}

// Takes (rows, columns) input and makes a grid
function makeRows(rowNum) {
  // Creates rows
  for (r = 0; r < rowNum; r++) {
    let row = document.createElement("div");
    container.appendChild(row).className = "gridRow";
  }
}

// Creates columns
function makeColumns(cellNum) {
  for (i = 0; i < rows.length; i++) {
    for (j = 0; j < cellNum; j++) {
      let newCell = document.createElement("div");
      rows[j].appendChild(newCell).className = "cell";
    }
  }
}
