import crypto from "crypto";

export default class RandomGenerator {
  constructor() {}

  randomKey() {
    const key = crypto.randomBytes(32).toString("hex");

    return key;
  }

  getRandomInt(min, max) {
    const randomBuffer = crypto.randomBytes(4);
    const randomInt = randomBuffer.readUInt32BE(0);

    return Math.round((randomInt / (0xffffffff + 1)) * (max - min)) + min;
  }

  calculateHMAC(key, message) {
    if (typeof message !== "string") {
      throw new TypeError("The message argument must be a 'string'");
    }

    return crypto.createHmac("sha3-256", key).update(message).digest("hex");
  }
}
