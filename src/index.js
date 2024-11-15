import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import Dice from "./classes/Dice.js";
import Game from "./classes/Game.js";
import checkup from "./utils/checkup.js";
import RandomGenerator from "./classes/RandomGenerator.js";

const main = async () => {
  const game = new Game();
  const generator = new RandomGenerator();
  // generator.key = await generator.randomKey();
  generator.number = await generator.getRandomInt(0, 1);
  let dice = process.argv.slice(2);
  let user = {
    name: "",
    score: 0,
  };

  checkup(dice);
  generator.randomKey();
  generator.getRandomInt(0, 1);

  console.log(generator.key);
  console.log(generator.number);

  console.log(generator.calculateHMAC);
  await game.greeting(user);
  // await game.startMenu();
};

main();
