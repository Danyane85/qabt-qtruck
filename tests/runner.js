const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM0MGJhNGY2LTg0YTMtNGQ0MC04ZDA4LWIzNGUxMjc3MTdjMS0xNjYzNjIyMjczODY0IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMGMwMGExNjItODRlYS00NGNkLTlkMDItYmYwNDg3MWZhYjMxIiwidHlwZSI6InQifQ.u46rNi6yFBNj9gt0gzS-V0XEdTpzjQulkBPm0U_4faw'


cypress.run({
  // specs to run here
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})