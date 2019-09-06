/** Sorts array alphabetically by 'name' property.
* @param {Object[]} arr - the array to sort.
*  @param {string} prop - the prop name to sort by. Ex: 'name'
* @returns {Object[]} - sorted array.
*/
const sortAlpha = (arr, prop) => arr.sort((a, b) => {
  const lowerA = a[prop] ? a[prop].toLowerCase() : a.data[prop].toLowerCase();
  const lowerB = b[prop] ? b[prop].toLowerCase(): b.data[prop].toLowerCase();
  if (lowerA < lowerB) {
    return -1;
  }
  if (lowerA > lowerB) {
    return 1;
  }
  return 0;
});

/** Sorts array numerically by 'aisle' property.
 * If aisle is undefined, assign 0 value and put item to top of the array.
* @param {Object[]} arr - the array to sort.
* @returns {Object[]} - sorted array.
*/
const sortAisle = (arr) => arr.sort((a, b) => {
  const parsedA = parseFloat(a.aisle) || 0;
  const parsedB = parseFloat(b.aisle) || 0;
  if (parsedA < parsedB) {
    return -1;
  }
  if (parsedA > parsedB) {
    return 1;
  }
  return 0;
});

/** Sorts array numerically by 'id' property, which is Date.now() when each item was created.
* @param {Object[]} arr - the array to sort.
* @returns {Object[]} - sorted array.
*/
const sortDate = (arr) => arr.sort((a, b) => {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
});

export {
  sortAlpha,
  sortAisle,
  sortDate,
}
