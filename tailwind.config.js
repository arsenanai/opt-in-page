module.exports = {
  purge: [
    './../**/*.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'tablet': '544px',
      'laptop': '832px',
      'desktop': '1120px',
    },
    extend: {
      spacing: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        55: '14rem',
        96: '24rem',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        mainColor: '#223CC2',
        mainDarker: '#0C2294',
        activeSecondary: '#090761',
        lightBlue: '#F7F9FB',
        mainBlack: '#434343',
        errorColor: '#EC5252',
        whiteBrand: '#F9F7F7',
        yellowBrand: '#FFCB5D',
        greenBrand: '#04B77E',
        greenDarker: '#0A986B',
        greyBorder: '#EFEFEF',
        greySecondary: '#C9C8E0',
        greyText: '#77838F',
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['active'],
    },
  },
  plugins: [],
}
