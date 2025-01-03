import "./style.css";
import { randomColor, shuffle } from "./helpers";

const cardBox = document.querySelector(".card-box");

const numberClicked = document.querySelector(".clicked");
const numberOverall = document.querySelector(".overall");

const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");

function squareCreator() {
  // prettier-ignore
  let square = { id: crypto.randomUUID(), isClicked: false, color: randomColor() };

  const getSquare = () => square;
  const getId = () => square.id;
  const getIsClicked = () => square.isClicked;
  const changeStatus = (status) => (square.isClicked = status);

  const getColor = () => square.color;

  return { getSquare, getId, getIsClicked, getColor, changeStatus };
}

function squareManagerCreator() {
  const squares = [];

  const addToSquares = (square) => squares.push(square);
  const getSquares = () => squares;
  const shuffleSquares = () => shuffle(squares);

  const emptyArray = () => squares.splice(0, squares.length);

  return { addToSquares, getSquares, shuffleSquares, emptyArray };
}
const managerSquare = squareManagerCreator();

function makeRows(rows, cols) {
  cardBox.innerHTML = "";
  cardBox.style.gridTemplateColumns = `repeat(${rows}, minmax(0, 1fr))`;
  cardBox.style.gridTemplateRows = `repeat(${cols}, minmax(0, 1fr)`;
  for (let c = 0; c < rows * cols; c++) {
    const creatorSquare = squareCreator();
    managerSquare.addToSquares(creatorSquare);
    console.log(managerSquare.getSquares()[c].getSquare());

    let cell = document.createElement("div");
    cardBox.appendChild(cell).className = "card";

    cell.setAttribute("data-id", creatorSquare.getId());
    cell.style.backgroundColor = creatorSquare.getColor();

    numberOverall.textContent = managerSquare.getSquares().length;

    clicked = 0;
    numberClicked.textContent = clicked;
  }
}

let clicked = 0;
makeRows(3, 3);

easy.addEventListener("click", function () {
  managerSquare.emptyArray();
  makeRows(3, 3);
});
medium.addEventListener("click", function () {
  managerSquare.emptyArray();
  makeRows(4, 4);
});
hard.addEventListener("click", function () {
  managerSquare.emptyArray();
  makeRows(5, 5);
});

// numberOverall.textContent = managerSquare.getSquares().length;

cardBox.addEventListener("click", function (e) {
  if (!e.target.classList.contains("card")) return;

  clicked++;

  const targetSquare = managerSquare
    .getSquares()
    .find((card) => card.getId() === e.target.getAttribute("data-id"));

  if (targetSquare.getIsClicked() === false) {
    targetSquare.changeStatus(true);
    numberClicked.textContent = clicked;
  } else {
    alert("GAME OVER");
    clicked = 0;
    numberClicked.textContent = clicked;
  }

  if (managerSquare.getSquares().every((x) => x.getIsClicked() === true)) {
    alert("YOU WON");
    clicked = 0;
    numberClicked.textContent = clicked;
  }

  cardBox.innerHTML = "";
  managerSquare.shuffleSquares();

  for (let i = 0; i < managerSquare.getSquares().length; i++) {
    const square = document.createElement("div");
    cardBox.appendChild(square).className = "card";
    square.setAttribute("data-id", managerSquare.getSquares()[i].getId());
    square.style.backgroundColor = managerSquare.getSquares()[i].getColor();
  }
});
