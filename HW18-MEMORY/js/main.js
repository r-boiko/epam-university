// task 1
const calculateFibByCycle = (sequenceLength) => {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= sequenceLength; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
};

const calculateFibByRecursion = (sequenceLength) =>
  (sequenceLength <= 1
    ? sequenceLength
    : calculateFibByRecursion(sequenceLength - 1) + calculateFibByRecursion(sequenceLength - 2));

const test = (sum, label, sequenceLength = 15) => {
  const start = performance.now();

  sum(sequenceLength);

  const timePassed = (performance.now() - start).toFixed(4);

  console.log(`${label}: ${timePassed} ms`); // eslint-disable-line
};

test(calculateFibByCycle, 'Cycle');
test(calculateFibByRecursion, 'Recursion');

// Recursion slowly because this func create new lexical environment
// and keep them in memory until it works out completely

// task 2
const parseJSON = (json) => {
  try {
    return JSON.parse(json);
  }
  catch (error) {
    return null;
  }
};
parseJSON('{"role":"Student", "company":"EPAM", "mentor":"Cool Mentor"}');
parseJSON('{role: Student, company: EPAM, mentor: Cool Mentor}');

// task 3
class CustomError extends Error {
  constructor(message) {
    super(message);

    this.name = 'CustomError';
  }
}
window.onerror = (message, url, lineNumber) => {
  document.body.innerHTML = `
  <strong>${message}</strong><br>
  in <strong>${url}</strong><br>
  on line <strong>${lineNumber}</strong>
  `;
};
const anotherParseJSON = (json) => {
  try {
    const parsedJSON = JSON.parse(json);
    if (Object.prototype.hasOwnProperty.call(parsedJSON, 'name') && Object.prototype.hasOwnProperty.call(parsedJSON, 'company')) {
      return parsedJSON;
    } else {
      throw new CustomError('json must have prop "name" and "company"');
    }
  }
  catch (error) {
    if (error.name === 'CustomError') {
      throw error;
    }
    console.error(error);
  }
};
anotherParseJSON('{"name":"Student", "company":"EPAM"}');
anotherParseJSON('name: Student, company: EPAM');
anotherParseJSON('{"name":"Student", "surname":"Cool"}');
