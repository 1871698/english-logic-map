/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          DEFAULT: '#B39DDB',
          50: '#f6f1fb',
          100: '#ede4f7',
          200: '#d6c2eb',
          700: '#7d61b5',
          800: '#654992',
          900: '#4a356f'
        },
        sky: {
          DEFAULT: '#64B5F6',
          50: '#eef8ff',
          100: '#d8efff',
          600: '#3d96de',
          800: '#2e5f93',
          900: '#214567'
        },
        forest: {
          DEFAULT: '#81C784',
          100: '#e4f5e4',
          500: '#81C784',
          800: '#34613c',
          900: '#214028'
        },
        parchment: '#F5EEDC',
        bark: '#74553C'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.35), 0 16px 50px rgba(58, 79, 64, 0.18)'
      },
      fontFamily: {
        display: ['Trebuchet MS', 'Microsoft YaHei', 'sans-serif'],
        body: ['Segoe UI', 'Microsoft YaHei', 'sans-serif']
      }
    }
  },
  plugins: []
}
