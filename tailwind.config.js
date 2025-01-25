/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"], // Ensures dark mode is controlled via class
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
	  extend: {
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		colors: {
		  background: "var(--background)",
		  foreground: "var(--foreground)",
		  card: {
			DEFAULT: "var(--card)",
			foreground: "var(--card-foreground)",
		  },
		  primary: {
			DEFAULT: "var(--primary)",
			foreground: "var(--primary-foreground)",
		  },
		  destructive: {
			DEFAULT: "var(--destructive)",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "var(--muted)",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "var(--accent)",
			foreground: "hsl(var(--accent-foreground))",
		  },
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  