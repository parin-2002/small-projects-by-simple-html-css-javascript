let ul = document.querySelector("ul");
let input = document.querySelector("input");
let btn = document.querySelector("button");
const ws = io("ws://192.168.43.83:3000");

ws.on("message", (msg) => {
  console.log(msg);
  let li = document.createElement("li");
  li.innerText = msg;
  ul.append(li);
});

btn.onclick = function () {
  ws.emit("message", input.value);
  input.value = "";
};
