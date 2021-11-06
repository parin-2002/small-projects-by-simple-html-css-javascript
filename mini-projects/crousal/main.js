const lis = document.querySelectorAll("li");
let index = 0;
function show(val) {
  index += val;
  index = Math.min(Math.max(index, 0), lis.length - 1);
  console.log(index);
  lis[index].scrollIntoView({ behavior: "smooth" });
}
