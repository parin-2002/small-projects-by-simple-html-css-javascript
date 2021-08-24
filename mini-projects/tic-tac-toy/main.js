const x_mark = "x";
const o_mark = "o";
const po_of_win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boxlist = document.querySelectorAll(".box");
const mainbox = document.querySelector(".main");
const win_msg = document.getElementById("win-msg");
const resetBtn = document.getElementById("reset");
const textOfwin = document.querySelector("[data-win]");
let turn;

startgame();

resetBtn.addEventListener("click", startgame);

function startgame() {
  turn = false;
  boxlist.forEach((one) => {
    one.classList.remove(x_mark);
    one.classList.remove(o_mark);
    one.removeEventListener("click", handleClick);
    one.addEventListener("click", handleClick, { once: true });
  });
  mainHoverturn();
  win_msg.classList.remove("show-msg");
}

function handleClick(e) {
  let box = e.target;
  const turn_class = turn ? o_mark : x_mark;
  handleMark(box, turn_class);
  if (checkwin(turn_class)) {
    endgame(false);
  } else if (draw()) {
    endgame(true);
  } else {
    changeTurn();
    mainHoverturn();
  }
}

function endgame(draw) {
  if (draw) {
    textOfwin.innerHTML = "Draw";
    win_msg.classList.add("show-msg");
  } else {
    textOfwin.innerText = `${turn ? "O' is won" : "x'is won"}`;
    win_msg.classList.add("show-msg");
  }
}

function draw() {
  return [...boxlist].every((one) => {
    return one.classList.contains(x_mark) || one.classList.contains(o_mark);
  });
}

function handleMark(box, turn_class) {
  box.classList.add(turn_class);
}

function changeTurn() {
  turn = !turn;
}

function mainHoverturn() {
  mainbox.classList.remove(x_mark);
  mainbox.classList.remove(o_mark);
  if (turn) {
    mainbox.classList.add(o_mark);
  } else {
    mainbox.classList.add(x_mark);
  }
}

function checkwin(turn_class) {
  return po_of_win.some((combination) => {
    return combination.every((index) => {
      return boxlist[index].classList.contains(turn_class);
    });
  });
}
