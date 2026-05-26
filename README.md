# Frontend Mentor - Password generator app solution

![Design preview for the Password generator app coding challenge](public/assets/images/preview.jpg)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [github repository](https://github.com/ronnarit-rabrong/password-generator-app)
- Live Site URL: [Live site](https://ronnarit-rabrong.github.io/password-generator-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

create generate password with Math.random in javascript. this function given 2 parametor length and option.

```ts
/**
 *  @length: charactor length 
 *  @option: check select charactor { 
 *      uppercase,
 *      lowercase ,
 *      number ,
 *      symbol,
 *    }
*/

export function randomFn(length: number, option: { [key: string]: boolean }): string {
  const set = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+-=[]{}|;:,?'
  }

  let charset = "";
  if (option.uppercase === true) charset += set.uppercase;
  if (option.lowercase === true) charset += set.lowercase;
  if (option.number === true) charset += set.number;
  if (option.symbol === true) charset += set.symbol;

  let password = "";
  for (let i: number = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
```

## Author

- Frontend Mentor - [@ronnarit-rabrong](https://www.frontendmentor.io/profile/ronnarit-rabrong)
