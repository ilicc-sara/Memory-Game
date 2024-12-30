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

const squares = [];
let newSquare;

function squareCreator() {
  // prettier-ignore
  let squareId = crypto.randomUUID();
  let squareColor = randomColor();
  let square = { id: squareId, isClicked: false, color: squareColor };

  // cards.forEach((card) => (card.style.backgroundColor = randomColor()));

  const getSquare = () => square;
  const getId = () => square.id;
  const getIsClicked = () => square.isClicked;
  const changeStatus = (status) => (square.isClicked = status);

  const getColor = () => square.color;

  return { getSquare, getId, getIsClicked, getColor, changeStatus };
}
const arr = [];
const square1 = squareCreator();
const square2 = squareCreator();
console.log("square1", square1.getSquare());
console.log("square2", square2.getSquare());

arr.push(squareCreator());

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

managerSquare.addToSquares(squareCreator());
console.log(managerSquare.getSquares());

// function createSquareGrid(num) {
//   for (let i = 0; i < num; i++) {
//     const creatorSquare = squareCreator();
//     managerSquare.addToSquares(creatorSquare.getSquare());

//     let square = document.createElement("div");
//     cardBox.appendChild(square).className = "card";
//   }
// }
// createSquareGrid(9);

// console.log(managerSquare.getSquares());
