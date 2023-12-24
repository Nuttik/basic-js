const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(value) {
    this.direct = value === false ? false : true;

    this.abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.matrixABC = [
      ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
      ["BCDEFGHIJKLMNOPQRSTUVWXYZA"],
      ["CDEFGHIJKLMNOPQRSTUVWXYZAB"],
      ["DEFGHIJKLMNOPQRSTUVWXYZABC"],
      ["EFGHIJKLMNOPQRSTUVWXYZABCD"],
      ["FGHIJKLMNOPQRSTUVWXYZABCDE"],
      ["GHIJKLMNOPQRSTUVWXYZABCDEF"],
      ["HIJKLMNOPQRSTUVWXYZABCDEFG"],
      ["IJKLMNOPQRSTUVWXYZABCDEFGH"],
      ["JKLMNOPQRSTUVWXYZABCDEFGHI"],
      ["KLMNOPQRSTUVWXYZABCDEFGHIJ"],
      ["LMNOPQRSTUVWXYZABCDEFGHIJK"],
      ["MNOPQRSTUVWXYZABCDEFGHIJKL"],
      ["NOPQRSTUVWXYZABCDEFGHIJKLM"],
      ["OPQRSTUVWXYZABCDEFGHIJKLMN"],
      ["PQRSTUVWXYZABCDEFGHIJKLMNO"],
      ["QRSTUVWXYZABCDEFGHIJKLMNOP"],
      ["RSTUVWXYZABCDEFGHIJKLMNOPQ"],
      ["STUVWXYZABCDEFGHIJKLMNOPQR"],
      ["TUVWXYZABCDEFGHIJKLMNOPQRS"],
      ["UVWXYZABCDEFGHIJKLMNOPQRST"],
      ["VWXYZABCDEFGHIJKLMNOPQRSTU"],
      ["WXYZABCDEFGHIJKLMNOPQRSTUV"],
      ["XYZABCDEFGHIJKLMNOPQRSTUVW"],
      ["YZABCDEFGHIJKLMNOPQRSTUVWX"],
      ["ZABCDEFGHIJKLMNOPQRSTUVWXY"],
    ];
  }
  encrypt(message, key) {
    //1.если str не строка, то нужно выбросить ошибку
    if (!message || typeof message != "string" || !key) {
      throw new Error("Incorrect arguments!");
    }

    let result = "";

    //1. если в message юникод, то сначало нужно перевести в буквенную строку
    let str = message.includes("/")
      ? message.replace(/\\u[\dA-F]{4}/gi, function (match) {
          return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
        })
      : message;

    //2.переводим строку в верхний регистр
    str = str.toUpperCase();

    key = key.toUpperCase(); //переводим в верхний регистр для поиска в матрице

    //4. кодируем
    for (let i = 0; i < str.length; i++) {
      //нужно обработать пробелы
      if (str[i] === " ") {
        result += str[i];
        str = str.slice(0, i - 1) + str.slice(i);
        i--;
      } else {
        if (this.abc.includes(str[i])) {
          //строка в матрице - индекс символа в строке
          //столбец в матрице - индекс символа в ключе
          let row = this.abc.indexOf(str[i]);
          let collum =
            this.abc.indexOf(key[i]) != -1
              ? this.abc.indexOf(key[i])
              : this.abc.indexOf(key[i % key.length]);
          let letter = this.matrixABC[row][0][collum];
          result += letter;
        } else {
          result += str[i];
        }
      }
    }

    //5.проверяем нужно ли разворачивать закодированную строку
    if (this.direct === false) {
      result = result.split("").reverse().join("");
    }

    //6. возвращаем результат
    return result;
  }
  decrypt(str, key) {
    //1.если str не строка, то нужно выбросить ошибку
    if (!str || typeof str != "string" || !key) {
      throw new Error("Incorrect arguments!");
    }

    let result = "";

    //2.ключ в верхний регистр для поиска в матрице
    key = key.toUpperCase();

    //4. декодируем
    for (let i = 0; i < str.length; i++) {
      //обработать пробелы
      if (str[i] === " ") {
        result += str[i];
        str = str.slice(0, i - 1) + str.slice(i);
        i--;
      } else {
        if (this.abc.includes(str[i])) {
          //строка в матрице - индекс символа в строке
          //столбец в матрице - индекс символа в ключе
          let row =
            this.abc.indexOf(key[i]) != -1
              ? this.abc.indexOf(key[i])
              : this.abc.indexOf(key[i % key.length]);

          let collum = this.matrixABC[row][0].indexOf(str[i]);

          let letter = this.matrixABC[0][0][collum];
          result += letter;
        } else {
          result += str[i];
        }
      }
    }

    //3.проверяем нужно ли разворачивать строку
    if (this.direct === false) {
      //сначала инвертироать строку, потом декодировать
      result = result.split("").reverse().join("");
    }
    //5. возвращаем результат
    return result;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
