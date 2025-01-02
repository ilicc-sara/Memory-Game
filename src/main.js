import "./style.css";
import { randomColor, shuffle } from "./helpers";

const cardBox = document.querySelector(".card-box");

const numberClicked = document.querySelector(".clicked");
const numberOverall = document.querySelector(".overall");

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

  return { addToSquares, getSquares, shuffleSquares };
}
const managerSquare = squareManagerCreator();

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
createSquareGrid(9);
numberOverall.textContent = managerSquare.getSquares().length;
let clicked = 0;

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
  }

  if (managerSquare.getSquares().every((x) => x.getIsClicked() === true)) {
    alert("YOU WON");
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
