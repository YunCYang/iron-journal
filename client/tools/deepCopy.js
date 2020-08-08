const deepCopy = inObj => {
  let value, key;
  const outObj = Array.isArray(inObj) ? [] : {};
  if (typeof inObj !== 'object' || inObj === null) return inObj;
  for (key in inObj) {
    value = inObj[key];
    outObj[key] = deepCopy(value);
  }
  return outObj;
};

export default deepCopy;
