let min = document.getElementById("min");
let sec = document.getElementById("sec");
let hour = document.getElementById("hour");

console.log(min, sec, hour);

setInterval(function () {
  let time = new Date();
  let time_sec = (time.getSeconds() / 60) * 360 - 90;
  let time_min = (time.getMinutes() / 60) * 360 - 90;
  let time_hour = (time.getHours() / 12) * 360 - 90;
  sec.style.transform = `rotate(${time_sec}deg)`;
  min.style.transform = `rotate(${time_min}deg)`;
  hour.style.transform = `rotate(${time_hour}deg)`;
}, 1000);
