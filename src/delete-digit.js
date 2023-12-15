const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  if (n < 10) {
    return n;
  }
  let max = 0;
  let srt = String(n);
  for (let i = 0; i < srt.length; i++) {
    if (+(srt.slice(0, i) + srt.slice(i + 1) > max))
      max = +(srt.slice(0, i) + srt.slice(i + 1));
  }
  return max;
}

module.exports = {
  deleteDigit,
};
