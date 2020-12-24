export const getArrayValue = (arrayObjects, key) => {
  let result = [];
  arrayObjects.forEach(item => {
    result.push(item[key]);
  });
  return result;
};
