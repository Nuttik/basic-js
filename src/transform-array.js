const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!(arr instanceof Array)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  //throw new NotImplementedError("Not implemented");
  // remove line with error and write your code here
  const modificators = [
    "--double-next",
    "--discard-next",
    "--double-prev",
    "--discard-prev",
  ];
  const result = [];

  arr.forEach((el, index, array) => {
    ///рассматриваем только эллементы не модификаторы
    if (!modificators.includes(el)) {
      //вычеркиваем случаи, при которых эллемент не добавляется в результат
      if (
        (array[index - 1] != "--discard-next" &&
          array[index + 1] != "--discard-prev") ||
        (array[index - 1] != "--discard-next" &&
          array[index + 1] != "--double-prev")
      ) {
        //если с обоих сторон нет модификатора, то мы просто добавляем число в массив
        if (
          array[index + 1] != "--discard-prev" &&
          array[index + 1] != "--double-prev" &&
          array[index - 1] != "--discard-next" &&
          array[index - 1] != "--double-next"
        ) {
          result.push(el);
        }
        //рассматриваем случаи положения модификаторов
        if (array[index - 1] === "--double-next") {
          result.push(el);
          result.push(el);
        }
        if (array[index - 1] === "--discard-next") {
          //пропускаем
        }
        if (array[index + 1] === "--double-prev") {
          if (array[index - 1] === "--double-next") {
            result.push(el);
          } else {
            result.push(el);
            result.push(el);
          }
        }
        if (array[index + 1] === "--discard-prev") {
          result.pop();
        }
      }
    }
  });
  return result;
}

module.exports = {
  transform,
};
