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

  const getSquares = () => squares;
  const shuffleSquares = () => shuffle(squares);

  return { getSquares, shuffleSquares };
}

cardBox.addEventListener("click", function (e) {
  if (!e.target.classList.contains("card")) return;

  e.target.setAttribute("data-id", memoryCard.getId());
  e.target.style.backgrundColor = memoryCard.getColor();
});
