const { NotImplementedError } = require("../extensions/index.js");

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const filesNames = {};
  const result = [];
  names.forEach((name) => {
    //проверили есть ли ключь в объекте
    if (Object.hasOwn(filesNames, name)) {
      filesNames[name] += 1;
    } else {
      //проверим, есть ли уже ключ в массиве
      if (!result.includes(name)) {
        filesNames[name] = 0;
        console.log(filesNames);
        console.log(result);
      } else {
        filesNames[name] = 1;
      }
    }
    //добавляем ключ в массив
    if (filesNames[name] > 0) {
      result.push(`${name}(${filesNames[name]})`);
    } else {
      result.push(name);
    }
  });
  return result;
}

module.exports = {
  renameFiles,
};
