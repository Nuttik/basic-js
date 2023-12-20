const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let result = "";
  str = String(str);
  let repeatTimes = options.repeatTimes ? options.repeatTimes : 1;
  let separator = Object.hasOwn(options, "separator")
    ? String(options.separator)
    : "+";

  let addition = Object.hasOwn(options, "addition")
    ? String(options.addition)
    : "";
  let additionRepeatTimes = options.additionRepeatTimes
    ? options.additionRepeatTimes
    : 1;

  let additionSeparator = Object.hasOwn(options, "additionSeparator")
    ? String(options.additionSeparator)
    : "|";

  let fullAddition = createSubStr(
    addition,
    additionRepeatTimes,
    additionSeparator
  );

  for (let i = 0; i < repeatTimes; i++) {
    result = result + str + fullAddition;
    if (i < repeatTimes - 1) {
      result += separator;
    }
  }

  return result;
}
function createSubStr(str, repeate, seporator) {
  let result = "";
  for (let i = 0; i < repeate; i++) {
    result = result + str;
    if (i < repeate - 1) {
      result = result + seporator;
    }
  }
  return result;
}

module.exports = {
  repeater,
};
