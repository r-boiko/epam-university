function validateTitle(value) {
  if (!isString(value)) {
    return 'incorrect input data';
  } else if (!isAllowLength(value)) {
    return 'INVALID';
  } else if (!isCorrectFirstSymbol(value)) {
    return 'INVALID';
  } else if (isFindSpecialSymbols(value)) {
    return 'VALID';
  } else {
    return 'INVALID';
  }
}

// init
validateTitle('Title!');

// additional func for task 1
function isString(value) {
  if (typeof value === 'string') {
    return true;
  } else {
    return false;
  }
}

function isAllowLength(value) {
  if (value.length < 2 || value.length > 2 && value.length > 20) {
    return false;
  } else {
    return true;
  }
}

function isCorrectFirstSymbol(value) {
  if ((Number.isNaN(Number(value.charAt(0))) === false || value.charAt(0).toLowerCase() === value.charAt(0).toUpperCase())) {
    return false;
  } else if (value.charAt(0) === value.charAt(0).toUpperCase()) {
    return true;
  } else {
    return false;
  }
}

function isAllowSpecialSymbol(value) {
  const allowSymbols = ['!', '?', '-', ':', ',', '.', ' '];
  if (allowSymbols.indexOf(value) > -1) {
    return true;
  } else {
    return false;
  }
}

function isFindSpecialSymbols(value) {
  const filteredValue = value.split('').filter((symbol) => {
    if (Number.isNaN(Number(symbol)) === true && symbol.toUpperCase() === symbol.toLowerCase()) {
      if (isAllowSpecialSymbol(symbol)) {
        return null;
      } else {
        return symbol;
      }
    }
  });

  if (filteredValue.length === 0) {
    return true;
  } else {
    return false;
  }
}

export default validateTitle;