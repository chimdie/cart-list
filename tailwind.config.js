/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"cart-red": "#c73a0f",
				"cart-green": "hsl(159, 69%, 38%)",
				"cart-rose": {
					50: "hsl(20, 50%, 98%)",
					100: "hsl(13, 31%, 94%)",
					300: "hsl(14, 25%, 72%)",
					400: "hsl(7, 20%, 60%)",
					500: "hsl(12, 20%, 44%)",
					900: "hsl(14, 65%, 9%)",
				},
			},
		},
	},
	plugins: [],
};
