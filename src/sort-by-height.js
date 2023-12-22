const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
function sortByHeight(arr) {
  const zeroIndexArray = [];
  const sortArray = [];

  arr.forEach((item, index) => {
    if (item === -1) {
      zeroIndexArray.push(index);
    } else {
      sortArray.push(item);
    }
  });
  sortArray.sort((a, b) => a - b);
  zeroIndexArray.forEach((item) => {
    sortArray.splice(item, 0, -1);
  });
  return sortArray;
}
module.exports = {
  sortByHeight,
};
