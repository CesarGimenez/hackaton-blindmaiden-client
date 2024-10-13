/* eslint-disable no-mixed-spaces-and-tabs */
import colors from 'tailwindcss/colors';

const customColors = () => {
	const arrColorsName = [
		'lightBlue',
		'warmGray',
		'trueGray',
		'coolGray',
		'blueGray',
	];

	arrColorsName.forEach(name => delete colors[name]);

	return {
		...colors,

		primary: '#AB47BC',
		secondary: '#002357',
		tertiary: '#2E85CC',

		transparent: 'transparent',
		current: 'currentColor',
		black: '#000000',
		white: '#ffffff',
		success: '#44d64b',
		warning: '#FFB818',
		error: '#DB1855',
	}
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
		colors: {
			...customColors(),
		},
		fontFamily: {
			nunito: ['Nunito', 'sans-serif'],
			nunitosans: ['Nunito-Sans', 'sans-serif'],
			montserrat: ['Montserrat', 'sans-serif'],
			poppins: ['Poppins', 'sans-serif'],
		},
  },
  plugins: [
	function({ addUtilities }) {
		const newUtilities = {
		  '.no-spin': {
			'-webkit-appearance': 'none',
			'-moz-appearance': 'textfield',
		  },
		  '.no-spin::-webkit-outer-spin-button': {
			'-webkit-appearance': 'none',
			'margin': '0',
		  },
		  '.no-spin::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			'margin': '0',
		  },
		}
		addUtilities(newUtilities, ['responsive', 'hover'])
	  }
  ],
};