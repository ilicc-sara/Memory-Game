import "./style.css";
import { randomColor, shuffle } from "./helpers";
// const cards = document.querySelectorAll(".card");
const cardBox = document.querySelector(".card-box");

const squares = [];
let newSquare;

function squareCreator() {
  // prettier-ignore
  let square = { id: crypto.randomUUID(), isClicked: false, color: randomColor() };

  // cards.forEach((card) => (card.style.backgroundColor = randomColor()));

  const getSquare = () => square;
  const getId = () => square.id;
  const getIsClicked = () => square.isClicked;
  const changeStatus = (status) => (square.isClicked = status);

  const getColor = () => square.color;

  return { getSquare, getId, getIsClicked, getColor, changeStatus };
}
// const arr = [];
// const square1 = squareCreator();
// const square2 = squareCreator();
// console.log("square1", square1.getSquare());
// console.log("square2", square2.getSquare());

// arr.push(squareCreator());

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

// managerSquare.addToSquares(squareCreator());
// console.log(managerSquare.getSquares());

// let square;
// let creatorSquare;

function createSquareGrid(num) {
  for (let i = 0; i < num; i++) {
    // managerSquare.addToSquares(squareCreator());

    const creatorSquare = squareCreator();
    managerSquare.addToSquares(creatorSquare);
    console.log(managerSquare.getSquares()[i].getSquare());

    const square = document.createElement("div");
    cardBox.appendChild(square).className = "card";

    square.setAttribute("data-id", creatorSquare.getId());

    square.style.backgroundColor = creatorSquare.getColor();
  }
}
createSquareGrid(4);

cardBox.addEventListener("click", function (e) {
  if (!e.target.classList.contains("card")) return;
  // console.log(managerSquare.getSquares().forEach(square => console.log(square.getColor())));

  const targetSquare = managerSquare
    .getSquares()
    .find((card) => card.getId() === e.target.getAttribute("data-id"));
  // targetSquare.isClicked = true;
  console.log("target square", targetSquare.getSquare());
  targetSquare.changeStatus(true);
  console.log("target square after", targetSquare.getSquare());

  // managerSquare.getSquares().forEach((square) => {
  //   console.log("Square:", square.getSquare());
  // });
  // console.log(managerSquare.getSquares(creatorSquare));

  // console.log(e.target.getAttribute("data-id"));

  managerSquare.shuffleSquares();

  managerSquare.getSquares().forEach((square) => {
    console.log("Square: pre praznjenja", square.getSquare());
  });
  cardBox.innerHTML = "";
  managerSquare.getSquares().forEach((square) => {
    console.log("Square: posle praznjenja", square.getSquare());
  });
  createSquareGrid(4);
  managerSquare.getSquares().forEach((square) => {
    console.log("Square: nakon poziva funkcije", square.getSquare());
  });
});
