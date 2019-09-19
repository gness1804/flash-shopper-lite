/** Finds a prop recursively in an object. Depends on a structure
 * where 'data' is the name of progressively deeper objects.
 * @param {Object} obj - the object to search.
 * @param {string} prop - the prop to search by. Ex: 'name'
 * @returns {string|number} - the return value.
 *
*/
const findPropRecursively = (obj, prop) => {
  if (obj[prop]) {
    return obj[prop];
  } if (obj.data) {
    return findPropRecursively(obj.data, prop);
  }
  return undefined;
};

/** Sorts array alphabetically by a custom property.
* @param {Object[]} arr - the array to sort.
*  @param {string} prop - the prop name to sort by. Ex: 'name'
* @returns {Object[]} - sorted array.
*/
const sortAlpha = (arr, prop) => arr.sort((a, b) => {
  const aVal = findPropRecursively(a, prop);
  const bVal = findPropRecursively(b, prop);

  const lowerA = aVal.toLowerCase();
  const lowerB = bVal.toLowerCase();

  if (lowerA < lowerB) {
    return -1;
  }
  if (lowerA > lowerB) {
    return 1;
  }
  return 0;
});

/** Sorts array numerically by a custom property.
* @param {Object[]} arr - the array to sort.
*  @param {string} prop - the prop name to sort by. Ex: 'aisle'
* @returns {Object[]} - sorted array.
*/
const sortNumeric = (arr, prop) => arr.sort((a, b) => {
  const aVal = findPropRecursively(a, prop);
  const bVal = findPropRecursively(b, prop);

  const parsedA = parseFloat(aVal) || 0;
  const parsedB = parseFloat(bVal) || 0;
  if (parsedA < parsedB) {
    return -1;
  }
  if (parsedA > parsedB) {
    return 1;
  }
  return 0;
});

export {
  sortAlpha,
  sortNumeric,
};
