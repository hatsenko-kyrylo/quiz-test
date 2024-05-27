/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(190, 88, 105)',
                gray: 'rgb(64, 58, 62)',
            },
            dropShadow: {
                primary: '2px 1px 0 rgb(64, 58, 62)',
            },
            boxShadow: {
                primary: '#403a3e 4px 4px 0 0',
                black: '#000000 4px 4px 0 0',
            },
        },
    },
    plugins: [],
};
