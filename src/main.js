import "./style.css";

const cards = document.querySelectorAll(".card");
const cardBox = document.querySelector(".card-box");

let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");

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

// function defaultGrid() {
//   makeRows(9);
//   makeColumns(9);
// }

// // Takes (rows, columns) input and makes a grid
// function makeRows(rowNum) {
//   // Creates rows
//   for (let r = 0; r < rowNum; r++) {
//     let row = document.createElement("div");
//     cardBox.appendChild(row).className = "gridRow";
//   }
// }

// // Creates columns
// function makeColumns(cellNum) {
//   for (let i = 0; i < rows.length; i++) {
//     for (let j = 0; j < cellNum; j++) {
//       let newCell = document.createElement("div");
//       rows[j].appendChild(newCell).className = "cell";
//     }
//   }
// }

// makeRows(9);
// makeColumns(9);

const squares = [];
let newSquare;

// cardBox.innerHTML = `<div class="card"></div>`;

function squareCreator() {
  // prettier-ignore
  const square = { id: crypto.randomUUID(), isClicked: false, color: randomColor() };

  // cards.forEach((card) => (card.style.backgroundColor = randomColor()));

  const getSquare = () => square;
  const getId = () => square.id;
  const getIsClicked = () => square.isClicked;
  const changeStatus = (status) => (square.isClicked = status);

  const getColor = () => square.color;

  return { getSquare, getId, getIsClicked, getColor };
}

// napravi funkciju create square grid
// ta fja treba raditi dve stvari
// 1. napravi x squareova (i gurni ih) u squares array (x poziva funkciji square creator)
// 2. napravi x br squareova na ekranu
// za ovo istraziti npr : how to create 16x16 grid with js
function squareManagerCreator() {
  const squares = [];

  const addToSquares = (square) => squares.push(square);
  const getSquares = () => squares;
  const shuffleSquares = () => shuffle(squares);

  return { addToSquares, getSquares, shuffleSquares };
}

const managerSquare = squareManagerCreator();
const creatorSquare = squareCreator();
function createSquareGrid(num) {
  for (let i = 0; i < num; i++) {
    managerSquare.addToSquares(creatorSquare.getSquare());

    let square = document.createElement("div");
    cardBox.appendChild(square).className = "card";
  }
}
createSquareGrid(9);

console.log(managerSquare.getSquares());
