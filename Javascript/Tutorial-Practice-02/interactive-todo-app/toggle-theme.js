//@ts-check

let darkThemeBtn = document.querySelector('#dark-theme-btn');
let lightThemeBtn = document.querySelector('#light-theme-btn');

darkThemeBtn.addEventListener('click', () => {
	setTheme('dark');
});

lightThemeBtn.addEventListener('click', () => {
	setTheme('light');
});

function setTheme(mode) {
	if (mode === 'light') {
		document.getElementById('theme-style').href = 'light.css';
	}

	if (mode === 'dark') {
		document.getElementById('theme-style').href = '';
	}
}
