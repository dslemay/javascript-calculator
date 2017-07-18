export function operation(val1, operator, val2) {
  var result;
  switch (operator) {
    case "+":
      result = Number(val1) + Number(val2);
      break;
    case "-":
      result = Number(val1) - Number(val2);
      break;
    case "\u00D7":
      result = Number(val1) * Number(val2);
      break;
    case "\u00F7":
      result = Number(val1) / Number(val2);
      break;
    case "%":
      result = Number(val1) * (Number(val2) / 100);
      break;
    default:
      throw new Error(operator + " is not a programmed function.");
  }
  return result.toString();
}

export function percentageToDecimal(value) {
  var result = Number(value) / 100;
  return result.toString();
}
