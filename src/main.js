import "./style.css";
import { randomColor, shuffle } from "./helpers";

const cardBox = document.querySelector(".card-box");

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

cardBox.addEventListener("click", function (e) {
  if (!e.target.classList.contains("card")) return;

  // console.log(managerSquare.getSquares().forEach(square => console.log(square.getColor())));

  const targetSquare = managerSquare
    .getSquares()
    .find((card) => card.getId() === e.target.getAttribute("data-id"));
  // targetSquare.isClicked = true;
  // console.log("target square", targetSquare.getSquare()); ********************

  if (targetSquare.getIsClicked() === false) {
    targetSquare.changeStatus(true);
  } else {
    alert("GAME OVER");
  }
  // console.log("target square after", targetSquare.getSquare());********************

  // managerSquare.getSquares().forEach((square) => {
  //   console.log("Square:", square.getSquare());
  // });
  // console.log(managerSquare.getSquares(creatorSquare));

  // console.log(e.target.getAttribute("data-id"));

  managerSquare.getSquares().forEach((square) => {
    // console.log("Square: pre mesanja", square.getSquare());*******************
  });

  // cardBox.innerHTML = "";
  managerSquare.getSquares().forEach((square) => {
    // console.log("Square: posle mesanja", square.getSquare()); *****************
  });
  // createSquareGrid(4);
  // managerSquare.getSquares().forEach((square) => {
  //   console.log("Square: nakon poziva funkcije", square.getSquare());
  // });

  cardBox.innerHTML = "";
  managerSquare.shuffleSquares();

  for (let i = 0; i < managerSquare.getSquares().length; i++) {
    // console.log(managerSquare.getSquares()[i].getSquare());**********************

    const square = document.createElement("div");
    cardBox.appendChild(square).className = "card";

    square.setAttribute("data-id", managerSquare.getSquares()[i].getId());

    square.style.backgroundColor = managerSquare.getSquares()[i].getColor();
  }

  // const clicked = managerSquare
  //   .getSquares()
  //   .find((x) => x.getId() === e.target.getAttribute("data-id"));

  // console.log(clicked.getSquare());

  // console.log(clicked.getIsClicked());
});
