import Game from "./classes/Game.js";

import FairPlay from "./classes/FairPlay.js";
import RandomGenerator from "./classes/RandomGenerator.js";

const main = async () => {
  const game = new Game();
  const generator = new RandomGenerator();
  const fairPlay = new FairPlay();
  let dice = process.argv.slice(2);
  let user = {
    name: "",
    score: 0,
  };

  // await game.greeting(user);
  // await game.startMenu();
};

main();
