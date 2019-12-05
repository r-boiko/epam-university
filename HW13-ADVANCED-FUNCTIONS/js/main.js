// task 1
const complexFunction = function (arg1, arg2) {
  return arg1 + arg2;
};

const cache = (fn) => {
  const cache = {};
  return (...args) => {
    const arg = args[0] + args[1];
    if (arg in cache) {
      return cache[arg];
    } else {
      const result = fn(args[0], args[1]);
      cache[result] = result;
      return result;
    }
  };
};

const cachedFunction = cache(complexFunction);
cachedFunction('foo', 'bar');
cachedFunction('foo', 'bar');
cachedFunction('foo', 'baz');

// task 2
const ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    console.log(this.step); // eslint-disable-line
    return this;
  },
};

ladder.up().up().down().up().showStep();

// task 3
function sum(...numbers) {
  return [...numbers].reduce((previousValue, currentValue) => previousValue + currentValue);
}

function mul(...numbers) {
  return [...numbers].reduce((previousValue, currentValue) => previousValue * currentValue);
}

sum(1, 2, 3);
mul(2, 3, 4);

function applyAll(func, ...numbers) {
  return func.call(this, ...numbers);
}

applyAll(sum, 1, 2, 3);
applyAll(mul, 2, 3, 4);
