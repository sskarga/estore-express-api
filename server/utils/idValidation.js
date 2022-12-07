import { apiError } from "../handleError/apiError.js";

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

export default (req, res, next) => {
  const id = req.params.id;
  if (!isIntLimit(id)) {
    return res.status(400).json(apiError(400, `1 Ошибка id: ${id}.`));
  }

  next();
};
