import crypto from "crypto";
import { Random } from "random-js";
const random = new Random();

export default class RandomGenerator {
  constructor() {}

  randomKey() {
    const key = crypto.randomBytes(32).toString("hex");

    return key;
  }

  getRandomInt(min, max) {
    return random.integer(min, max);
  }

  calculateHMAC(key, message) {
    if (typeof message !== "string") {
      throw new TypeError("The message argument must be a 'string'");
    }

    return crypto.createHmac("sha3-256", key).update(message).digest("hex");
  }
}
