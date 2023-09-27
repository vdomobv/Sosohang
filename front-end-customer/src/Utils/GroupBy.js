export function customGroupBy(array, keyFunc) {
  return array.reduce((result, currentItem) => {
    const key = keyFunc(currentItem);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(currentItem);
    return result;
  }, {});
}

