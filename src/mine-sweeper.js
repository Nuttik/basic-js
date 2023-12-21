const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const setup = [];

  for (let i = 0; i < matrix.length; i++) {
    //создаем строку в игровом поле
    setup.push([]);

    for (let j = 0; j < matrix[i].length; j++) {
      let count = 0;

      if (i > 0) {
        console.log(findCountMineiInRow(matrix, i - 1, j));
        count += findCountMineiInRow(matrix, i - 1, j);
      }
      if (i < matrix.length - 1) {
        console.log(findCountMineiInRow(matrix, i + 1, j));
        count += findCountMineiInRow(matrix, i + 1, j);
      }
      //для текущей строки нужно исключить саму ячейку, вокруг которой ищем мины, поэтому не используем  findCountMineiInRow
      if (j > 0) {
        if (matrix[i][j - 1] === true) {
          count++;
        }
      }
      if (j < matrix[i].length - 1) {
        if (matrix[i][j + 1] === true) {
          count++;
        }
      }
      //заполняем строку значением количества мин вокруг
      setup[i].push(count);
    }
  }
  return setup;
}

function findCountMineiInRow(matrix, i, j) {
  let count = 0;
  if (j > 0) {
    if (matrix[i][j - 1] === true) {
      count++;
    }
  }
  if (matrix[i][j] === true) {
    count++;
  }
  if (j < matrix[i].length - 1) {
    if (matrix[i][j + 1] === true) {
      count++;
    }
  }
  return count;
}

module.exports = {
  minesweeper,
};
