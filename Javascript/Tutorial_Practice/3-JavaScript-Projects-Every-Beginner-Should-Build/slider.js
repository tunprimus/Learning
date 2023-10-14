const leftElem = document.querySelector('.left');
const rightElem = document.querySelector('.right');
const sliderElem = document.querySelector('.slider');
const imagesElem = document.querySelectorAll('.image');
const bottomElem = document.querySelector('.bottom');
const buttonsElem = document.querySelectorAll('.button');

let slideNumber = 1;
const slideLength = imagesElem.length;

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

rightElem.addEventListener('click', () => {
  slideNumber < slideLength ? nextSlide() : getFirstSlide();
});

leftElem.addEventListener('click', () => {
  slideNumber === 1 ? jumpToEndSlide() 
    : slideNumber > 1 ? prevSlide() : getLastSlide();
});
