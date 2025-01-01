export const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomColor = () =>
  `rgb(${randomNum(0, 225)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
