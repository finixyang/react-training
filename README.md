## PRE-STEP :zero:
### Environment Installation :icecream:
> `[windows]` : use `Babun` that provide `Cygwin`  environment  and bundle some useful tools instead of `CMD`

- Node must be required
- ``` $ npm i -g create-react-app``` that is a react sead  project scaffold created by React

### Knowledgemap
- [This is dva.js principle but have some ES6 features can learn](https://github.com/dvajs/dva-knowledgemap)
- [ES6 Book written by ruanyifeng](http://es6.ruanyifeng.com/)
---
## STEP1 :one:

### What
- A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES

### Why
- `Component` is base on `JAVASCRIPT` instead of template , can easily pass data or keep state
- NO DOM , friendly to devloper
- `Shadow DOM`,  `Component`, toward future
- learn once, use anywhere

---
## STEP2 :two:

### JSX

Like as `const element = <h1>Hello, world!</h1>` , a syntax extension to javascript

- can embed expression js code
- after compilation , will became regular js object 
- string attributes use quotes, js expression use curly braces, like as `const ele = <img src={user.avatarUrl} />`
- must uses `camelCase` property naming convention instead of HTML attribute names

### Element

Element is smallest building blocks in React App, unlike normal browser DOM, element is a plain js object
- element is immutable, there is only way to update UI that is call `ReactDOM.render()`, although maybe have mutiple calls, React only update what's necessary

## TODO LIST
- [x] Component
- [ ] Props
- [ ] State
- [ ] ...

