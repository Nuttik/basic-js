const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  let dns = {};
  domains.forEach((domen) => {
    let currentDNS = "";
    while (domen.length > 0) {
      //отделяем последнююю зону зоны и прибавляем эту доменную зону к текущей
      //уменьшаем домен на текущую зону
      if (domen.includes(".")) {
        currentDNS += domen.slice(domen.lastIndexOf("."));
        domen = domen.slice(0, domen.lastIndexOf("."));
      } else {
        currentDNS += "." + domen;
        domen = "";
      }
      //проверяем есть ли название этой зоны в ключах объекта dns
      if (!dns.hasOwnProperty(currentDNS)) {
        dns[currentDNS] = 1;
      } else {
        dns[currentDNS] += 1;
      }
    }
  });
  return dns;
}

module.exports = {
  getDNSStats,
};
