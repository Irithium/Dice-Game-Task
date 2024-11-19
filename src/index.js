import Game from "./classes/Game.js";
import DiceConfig from "./classes/DiceConfig.js";

const main = async () => {
  const diceConfig = new DiceConfig();
  const game = new Game();

  diceConfig.dieParse(process.argv.slice(2));
  diceConfig.validateInput();

  await game.greeting();
  await game.menu();
};

main();
