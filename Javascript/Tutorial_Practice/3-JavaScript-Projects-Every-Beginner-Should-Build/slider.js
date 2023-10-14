const DEFAULT_BUTTONS_NUMBER = 4;

const leftElem = document.querySelector('.left');
const rightElem = document.querySelector('.right');
const sliderElem = document.querySelector('.slider');
const imagesElem = document.querySelectorAll('.image');
const bottomElem = document.querySelector('.bottom');
const buttonsElem = document.querySelectorAll('.button');

let slideNumber = 1;
const slideLength = imagesElem.length;

if (slideLength > DEFAULT_BUTTONS_NUMBER) {
  const fragment = new DocumentFragment();
  for (let i = DEFAULT_BUTTONS_NUMBER; i < slideLength; i++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button';
    fragment.appendChild(button);
  }
  bottomElem.appendChild(fragment);
}

buttonsElem[0].style.backgroundColor = 'white';

const resetBtnBg = () => {
  buttonsElem.forEach(btn => {
    btn.style.backgroundColor = 'transparent';
  });
};

buttonsElem.forEach((button, pos) => {
  button.addEventListener('click', () => {
    resetBtnBg();
    sliderElem.style.transform = `translateX(-${pos * 100}%)`;
    slideNumber = pos + 1;
    button.style.backgroundColor = 'white';
  });
});

const nextSlide = () => {
  sliderElem.style.transform = `translateX(-${slideNumber * 100}%)`;
    slideNumber++;
};

const prevSlide = () => {
  sliderElem.style.transform = `translateX(-${(slideNumber - 2) * 100}%)`;
    slideNumber--;
};

const getFirstSlide = () => {
  sliderElem.style.transform = `translateX(-${slideNumber * 0}%)`;
  slideNumber = 1;
};

const getLastSlide = () => {
  sliderElem.style.transform = `translateX(-${(slideNumber - 1) * 100}%)`;
  slideNumber = slideLength;
};

const jumpToEndSlide = () => {
  sliderElem.style.transform = `translateX(-${(slideLength - 1) * 100}%)`;
  slideNumber = slideLength;
};

const changeColour = () => {
  resetBtnBg();
  buttonsElem[slideNumber - 1].style.backgroundColor = 'white';
};

rightElem.addEventListener('click', () => {
  slideNumber < slideLength ? nextSlide() : getFirstSlide();
  changeColour();
});

leftElem.addEventListener('click', () => {
  slideNumber === 1 ? jumpToEndSlide() 
    : slideNumber > 1 ? prevSlide() : getLastSlide();
  changeColour();
});


