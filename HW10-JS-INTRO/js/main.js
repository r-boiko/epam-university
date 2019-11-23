// task 1
let age = 12;
if (age > 5) {
  age = 5;
  console.log('more than 5');
} else if (age < 10) {
  console.log('Less than 5');
}
// because if exits on the first true

// task 2
let message;
const login = 'Marks';
message = (login === 'Marks') ? 'Hi, Marks' : (login === 'Serg') ? 'Hi, Serg' : (login === '') ? 'Hi, undefined' : '';
console.log(message);