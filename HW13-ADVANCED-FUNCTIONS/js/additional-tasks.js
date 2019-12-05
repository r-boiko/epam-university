/* eslint-disable */

// TASK 3
// Реализовать ф-цию patchObject, которая первым параметром принимает объект который будет разширен
// произвольным числом методов переданных в аргменты ф-ции и возвращает разширенный объект.
// Так же необходимо реализовать ф-ции : greetings, showSuccess, howOldAreYou, таким образом,
// чтобы при их вызове на исходных объектах они работали так как ожидается в блоке консоль логов
function patchObject(obj, ...methods) {
  const filterMethods = {};
  for (let i = 1; i < arguments.length; i++) {
    filterMethods[arguments[i].name] = arguments[i];
  }
  return {...obj, ...filterMethods};
}

let obj = {
  name: 'Ivan',
  surname: 'Baraban',
  age: 42,
  score: 12,
};

let obj2 = {
  name: 'Petya',
  surname: 'Padawan',
  age: 52,
  score: 28,
};

const greetings = function hello(greeting) {
  return this.name ? (`${greeting}, my name is ${this.name}`) : (`${greeting}, my name is unknown`);
};
const showSuccess = function showSuccessKoef() {
  return this.age && this.score ? (this.age / this.score) : 0;
};
const howOldAreYou = function myAge() {
  return this.age ? this.age : `age is unavailable`;
};

obj = patchObject(obj, greetings, howOldAreYou, showSuccess);
obj2 = patchObject(obj2, greetings, howOldAreYou);
obj3 = patchObject(null, greetings, howOldAreYou, showSuccess);

console.log(obj.myAge()); //42
console.log(obj.showSuccessKoef()); //3.5
console.log(obj.hello('yo')); // yo, my name is Ivan
console.log(obj2.myAge()); // 52
console.log(obj2.hello('Hi sir')); // Hi sir, my name is Petya
console.log(obj3.hello('Good Day')); // Good Day, my name is unknown
console.log(obj3.showSuccessKoef()); // 0
console.log(obj3.myAge()); // age is unavailable

// TASK 5
// Реализовать ф-ции чисел и ф-ции операторов таким образом чтобы они работали в формате число - оператор - число
function calculateResult(array) {
  switch (array[1]) {
    case '+':
      return Number(array[0]) + Number(array[2]);
      break;
    case '-':
      return Number(array[0]) - Number(array[2]);
      break;
    case '*':
      return Number(array[0]) * Number(array[2]);
      break;
    case '/':
      return Number(array[0]) / Number(array[2]);
      break;
  }
}

function zero(func) {
  if (func) {
    let result = `0 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 0;
  }
}

function one(func) {
  if (func) {
    let result = `1 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 1;
  }
}

function two(func) {
  if (func) {
    let result = `2 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 2;
  }
}

function three(func) {
  if (func) {
    let result = `3 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 3;
  }
}

function four(func) {
  if (func) {
    let result = `4 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 4;
  }
}

function five(func) {
  if (func) {
    let result = `5 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 5;
  }
}

function six(func) {
  if (func) {
    let result = `6 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 6;
  }
}

function seven(func) {
  if (func) {
    let result = `7 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 7;
  }
}

function eight(func) {
  if (func) {
    let result = `8 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 8;
  }
}

function nine(func) {
  if (func) {
    let result = `9 ${func}`.split(" ");
    return calculateResult(result);
  } else {
    return 9;
  }
}

function plus(func) {
  return `+ ${func}`;
}

function minus(func) {
  return `- ${func}`;
}

function multiply(func) {
  return `* ${func}`;
}

function divide(func) {
  return `/ ${func}`;
}

console.log(seven(multiply(five()))); // 35
console.log(four(plus(nine()))); // 13
console.log(eight(minus(three()))); // 5
console.log(six(divide(two()))); // 3