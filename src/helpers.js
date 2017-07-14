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
  }
  return result.toString();
}
