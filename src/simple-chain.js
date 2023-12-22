const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    this.chain.push(`${value}`);
    return this;
  },
  removeLink(position) {
    if (
      Number.isInteger(position) &&
      position < this.getLength() - 1 &&
      position > 0
    ) {
      this.chain = this.chain
        .slice(0, position - 1)
        .concat(this.chain.slice(position));
      return this;
    } else {
      this.chain = [];
      throw new NotImplementedError("You can't remove incorrect link!");
    }
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    const result = this.chain.map((link) => `( ${link} )`);
    this.chain = [];
    return result.join("~~");
  },
};

module.exports = {
  chainMaker,
};
