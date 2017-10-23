# Contributing to jump-and-run

## Editors

### JetBrains IDE
There are predefined settings for Intelij IDE and Webstorm.  
Make sure Eslint is properly configured and enabled to use the project coding standard configured in .eslintrc.  
The auto formatter in Intellij should then do a lot of code style fixes for you.

## Styleguides

### Documentation
- Use Markdown files

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- When only changing documentation, include [ci skip] in the commit description

### JavaScript Styleguide
All js source files must fulfill the [JavaScript Standard Style](http://standardjs.com/).
Using ES6 standards is encouraged.

* Inline `export`s with expressions whenever possible
```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```
