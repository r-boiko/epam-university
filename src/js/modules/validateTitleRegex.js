function validateTitle(value) {
  return /^[A-Z][\w\s!?:\-,.]{5,59}$/.test(value);
}

export default validateTitle;
