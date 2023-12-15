const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  let minStr = s1;
  let maxStr = s2;
  if (s1.length != s2.length) {
    minStr = s1.length <= s2.length ? s1 : s2;
    maxStr = s1.length > s2.length ? s1 : s2;
  }
  let commonCharacters = 0;

  for (let i = 0; i < minStr.length; i++) {
    if (maxStr.includes(minStr[i])) {
      commonCharacters += 1;

      //убираем из большей строки совпавший символ, чтобы не посчитать его повторно
      maxStr =
        maxStr.slice(0, maxStr.indexOf(minStr[i])) +
        maxStr.slice(maxStr.indexOf(minStr[i]) + 1);
    }
  }
  return commonCharacters;
}

module.exports = {
  getCommonCharacterCount,
};
