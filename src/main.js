import "./style.css";

console.log("ja sam mala ciganka 99");

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

function squareCreator() {
  // prettier-ignore
  const square = { id: crypto.randomUUID(), isClicked: false, color: randomColor() };

  // cards.forEach((card) => (card.style.backgroundColor = randomColor()));

  const getId = () => card.id;
  const getIsClicked = () => card.isClicked;
  const getColor = () => card.color;

  return { getId, getIsClicked, getColor };
}

function squareManager() {
  const squares = [];

  const getSquares = () => squares;
  const shuffleSquares = () => shuffle(squares);
}
