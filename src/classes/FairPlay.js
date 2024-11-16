export default class FairPlay {
  constructor(key, number, hmac) {
    this.key = key;
    this.number = number;
    this.hmac = hmac;
  }
}
