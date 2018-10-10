import isEqual from 'lodash-es/isEqual';

// Constantes
const holes = 4;
const colors = ['red', 'yellow', 'blue', 'green', 'magenta', 'pink'];

let solution = [];
let turn = [];
let shine = [];

// DOM
const container = document.querySelector('.container');
const check = document.querySelector('#check');

// Iniciar partida (Crea solución)
let newGame = () => {
  for (let i = 0; i < holes; i++) {
    let newColor = Math.floor(Math.random() * colors.length);
    solution.push(newColor);
    turn.push(-1);
    shine.push(0);
  }
  container.innerHTML = '';
  check.addEventListener('click', checkTurn);
};

// Nuevo turno (Actualiza fila de bolas)
let newTurn = () => {
  let row = document.createElement('div');
  row.className = 'row';
  
  for (let i = 0; i < holes; i++) {
    let newBall = document.createElement('div');
    newBall.className = 'ball';
    newBall.classList.add(colors[turn[i]]);
    newBall.addEventListener('click', changeColor.bind(this, i));
    row.appendChild(newBall);
    shine[i] = 0;
  }

  container.appendChild(row);
};

let changeColor = (numItem, e) => {
  e.target.className = 'ball';
  e.target.classList.add(colors[(turn[numItem]+1) % colors.length]);
  turn[numItem] = (turn[numItem] + 1) % colors.length;
};

let checkTurn = () => {
  let pos = comparePositionColors();
  compareNumberColors();

  if (!isEqual(solution, turn)) {

    let balls = container.querySelectorAll('.row:last-child .ball');
    shine.forEach( (e,i) => {
      if (e == 1)
        balls[i].classList.add('shine');
    });

    pos.forEach( (e,i) => {
      if (e == true)
        balls[i].classList.add('ok');
      else
        balls[i].classList.add('fail');
    });

    newTurn();
  }
  else {
    document.querySelector('.row:last-child').classList.add('win');
    document.querySelector('.panel').innerHTML = 'WIN';
    check.remove();    
  }
};

let comparePositionColors = () => turn.map((e,i) => e == solution[i]);

let compareNumberColors = () => {
  let solutionNumberColors = [];
  let turnNumberColors = [];
  for (let i = 0; i < colors.length; i++) {
    solutionNumberColors[i] = solution.filter(e => (e == i)).length;
    turnNumberColors[i] = turn.filter(e => (e == i)).length;
  }
  
  let result = solutionNumberColors.map( (e,i) => (e - turnNumberColors[i]) >= 0);
  for (let i = 0; i < turn.length; i++) {
    if (result[turn[i]])
      shine[i] = 1;
  }
};

newGame();
newTurn();
