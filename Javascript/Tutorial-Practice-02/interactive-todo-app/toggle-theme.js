//@ts-check

let theme = localStorage.getItem('theme');
const darkThemeBtn = document.querySelector('#dark-theme-btn');
const lightThemeBtn = document.querySelector('#light-theme-btn');

// If no theme is selected, the dark theme is the default
if (theme === null) {
	setTheme('dark');
} else {
	setTheme(theme);
}

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

	// Store the selected theme in the local storage
	localStorage.setItem('theme', mode);
}
