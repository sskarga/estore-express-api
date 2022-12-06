export function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

export function isIntLimit(value) {
  return /^(0|[1-9]\d{0,5})$/.test(value);
}
