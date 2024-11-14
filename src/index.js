import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import Dice from "./classes/Dice.js";
import Game from "./classes/Game.js";
import checkup from "./utils/checkup.js";
import RandomNumberGenerator from "./classes/RandomNumberGenerator.js";

const main = async () => {
  const game = new Game();
  const randomGenerator = new RandomNumberGenerator();
  let dices = process.argv.slice(2);
  let user = {
    name: "",
    score: 0,
  };

  checkup(dices);

  // await game.greeting(user);
  // await game.startMenu();
  await randomGenerator.randomKey();
};

main();
