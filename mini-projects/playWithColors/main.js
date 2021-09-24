let random_hex = document.querySelector(".random-hex button");
let random_rgb = document.querySelector(".random-rgb button");
let setByUser = document.querySelector(".try");
let Hex_val = "#fff";
let Rgb_val = "#fff";
let Try_val = "#fff";

//customEvent
const event = new CustomEvent("changeBg", {
  detail: "ApplyColor",
  bubbles: true,
});
document.body.addEventListener("changeBg", function (e) {
  document.body.style.background = `linear-gradient(0.25turn,${Hex_val}, ${Rgb_val}, ${Try_val})`;
});

random_hex.addEventListener("click", () => {
  Hex_val = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  document.querySelector(".random-hex").style.background = Hex_val;
  document.body.dispatchEvent(event);
});

random_rgb.addEventListener("click", () => {
  let num1 = Math.floor(Math.random() * 255);
  let num2 = Math.floor(Math.random() * 255);
  let num3 = Math.floor(Math.random() * 255);
  Rgb_val = `rgb(${num1},${num2},${num3})`;
  document.querySelector(
    ".random-rgb"
  ).style.background = `rgb(${num1},${num2},${num3})`;
  document.body.dispatchEvent(event);
});

//event deligation concept
setByUser.addEventListener("input", (e) => {
  let range1 = document.querySelector("input[type=range]:nth-child(1)").value;
  let range2 = document.querySelector("input[type=range]:nth-child(2)").value;
  let range3 = document.querySelector("input[type=range]:nth-child(3)").value;
  Try_val = `rgb(${range1},${range2},${range3})`;
  setByUser.style.background = `rgb(${range1},${range2},${range3})`;
  document.body.dispatchEvent(event);
});
