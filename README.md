# breakout

A breakout browser game written in javascript

## Development

### Getting Started

#### Requirements

* node.js
* npm

Local installation of the dependencies
```
npm install
```

Global Installation of eslint for easy cli use
```
npm install -g eslint
```

#### Check your code

You can use
```
eslint ./src/**
```
or the npm script
```
npm run eslint
```

#### Building

To build the project, just type
```
npx webpack
```
or use the following npm script
```
npm run build
```

It creates ./dist/main.js file using the ./src/index.js file
