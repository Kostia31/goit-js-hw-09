const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.body,
};

class Coloraizer {
  constructor() {
    this.idInterval = 'null';
  }
  onChangeBodyColor() {
    this.idInterval = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
      refs.start.disabled = true;
    }, 1000);
  }

  ofChangeBodycolor() {
    clearInterval(this.idInterval);
    refs.start.disabled = false;
  }
}
const colorSwitch = new Coloraizer();


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}


refs.stop.addEventListener('click', colorSwitch.ofChangeBodycolor.bind(Coloraizer));
refs.start.addEventListener('click', colorSwitch.onChangeBodyColor.bind(Coloraizer));
