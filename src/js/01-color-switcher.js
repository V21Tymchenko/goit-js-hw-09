const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  bodyRef: document.body,
};

const CHANGE_COLOR_DELEY = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    onClickChangeBodyColor();
  }, CHANGE_COLOR_DELEY);
});

function onClickChangeBodyColor() {
  refs.bodyRef.style.backgroundColor = getRandomHexColor();
  if (!refs.btnStart.hasAttribute('disabled')) {
    refs.btnStart.setAttribute('disabled', 'true');
  }
}

refs.btnStop.addEventListener('click', stopChangeColor);

function stopChangeColor() {
  clearInterval(timerId);
  if (refs.btnStart.hasAttribute('disabled')) {
    refs.btnStart.removeAttribute('disabled');
  }
  console.log(`Interval with id ${timerId} has stopped!`);
}
