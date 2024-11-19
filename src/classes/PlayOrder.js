import chalk from "chalk";
import inquirer from "inquirer";
import FairPlay from "./FairPlay.js";
import RandomGenerator from "./RandomGenerator.js";
import DiceConfig from "./DiceConfig.js";
import {
  diceSelectPrompt,
  diceThrowPrompt,
  numberSelect,
} from "../utils/prompts.js";
import { RANDOM_RANGE, EXIT_MESSAGE } from "../config/constants.js";
import {
  generateHMAC,
  logHMAC,
  logDiceResult,
  logKey,
} from "../utils/helpers.js";
import ProbabilityCalculator from "./ProbabilityCalculator.js";
import ProbabilityTable from "./ProbabilityTable.js";

export default class PlayOrder {
  constructor(playerDice, computerDice, playerResult, computerResult) {
    this.playerFirst = false;
    this.playerDice = playerDice;
    this.computerDice = computerDice;
    this.playerResult = playerResult;
    this.computerResult = computerResult;
    this.generator = new RandomGenerator();
  }

  async diceThrow() {
    const fairPlay = new FairPlay(
      this.generator.randomKey(),
      this.generator.getRandomInt(RANDOM_RANGE.min, RANDOM_RANGE.max)
    );

    try {
      console.log(
        chalk.blue(
          `  It's time to throw the dice.\n  I selected a random value between 0-5`
        )
      );
      generateHMAC(this.generator, fairPlay);
      logHMAC(fairPlay);

      let playerOption = await inquirer.prompt(
        diceThrowPrompt(this.playerDice)
      );

      if (playerOption.selection === "exit") {
        console.log(chalk.white.bold(EXIT_MESSAGE));
        process.exit(1);
      }

      console.log(
        chalk.blue(
          `  Your selection: ${playerOption.selection}\n  My number is: ${fairPlay.number} `
        )
      );
      logKey(fairPlay);

      let result = (playerOption.selection + fairPlay.number) % 6;
      this.playerResult = this.playerDice[result];
      logDiceResult(fairPlay.number, playerOption.selection, result);

      // Turno de la máquina
      fairPlay.number = this.generator.getRandomInt(
        RANDOM_RANGE.min,
        RANDOM_RANGE.max
      );
      fairPlay.key = this.generator.randomKey();
      generateHMAC(this.generator, fairPlay);

      console.log(
        chalk.blue(
          `  Now it's my turn to throw the dice.\n  I selected another value between 0-5`
        )
      );
      logHMAC(fairPlay);
      playerOption = await inquirer.prompt(diceThrowPrompt(this.computerDice));

      if (playerOption.selection === "exit") {
        console.log(chalk.white.bold(EXIT_MESSAGE));
        process.exit(1);
      }
      console.log(
        chalk.blue(
          `  Your selection: ${playerOption.selection}\n  My number is: ${fairPlay.number}`
        )
      );
      logKey(fairPlay);
      result = (playerOption.selection + fairPlay.number) % 6;
      this.computerResult = this.computerDice[result];
      logDiceResult(fairPlay.number, playerOption.selection, result);

      // Comparar resultados y determinar el ganador
      await this.compareResults();
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  compareResults() {
    if (this.playerResult > this.computerResult) {
      console.log(
        chalk.green.bold(
          `  Congratulations! You win with a score of ${this.playerResult} against my ${this.computerResult}.`
        )
      );
    } else if (this.playerResult < this.computerResult) {
      console.log(
        chalk.red.bold(
          `  I win with a score of ${this.computerResult} against your ${this.playerResult}.`
        )
      );
    } else {
      console.log(
        chalk.yellow.bold(`  It's a tie! Both scored ${this.playerResult}.`)
      );
    }
  }

  async diceSelect(playerFirst) {
    const diceConfig = new DiceConfig();
    const generator = new RandomGenerator();

    diceConfig.dieParse(process.argv.slice(2));

    try {
      if (playerFirst) {
        console.log(chalk.blue(`  You choose first.`));

        const option = await inquirer.prompt(diceSelectPrompt(diceConfig.dice));

        if (option.selection === "exit") {
          console.log(chalk.white.bold(EXIT_MESSAGE));
          process.exit(1);
        }
        if (option.selection === "help") {
          const diceNames = await diceConfig.dice.map((die) => die.join(","));
          const calculator = new ProbabilityCalculator(diceConfig.dice);
          const probabilities = await calculator.calculateWinProbabilities();

          const probabilityTable = await new ProbabilityTable(
            probabilities,
            diceNames
          );
          await probabilityTable.displayIntro();
          await probabilityTable.displayAll();
          await this.diceSelect(this.playerFirst);
          return;
        }

        this.playerDice = option.selection;

        diceConfig.dice = diceConfig.dice.filter(
          (die) => die !== this.playerDice
        );

        const selector = await generator.getRandomInt(
          0,
          diceConfig.dice.length - 1
        );
        this.computerDice = diceConfig.dice[selector];
        diceConfig.dice = diceConfig.dice.filter(
          (die) => die !== this.computerDice
        );

        console.log(
          chalk.blue(
            `  It's my turn and I choose the [${this.computerDice}] dice.`
          )
        );
      } else {
        const selector = await generator.getRandomInt(
          0,
          diceConfig.dice.length - 1
        );
        this.computerDice = diceConfig.dice[selector];
        diceConfig.dice = diceConfig.dice.filter(
          (die) => die !== this.computerDice
        );
        console.log(
          chalk.blue(
            `  I make the first move and choose the [${this.computerDice}] dice.\n  Now it's your turn.`
          )
        );
      }

      if (!playerFirst) {
        const option = await inquirer.prompt(diceSelectPrompt(diceConfig.dice));
        if (option.selection === "exit") {
          console.log(chalk.white.bold(EXIT_MESSAGE));
          process.exit(1);
        }

        if (option.selection === "help") {
          const diceNames = await diceConfig.dice.map((die) => die.join(","));
          const calculator = new ProbabilityCalculator(diceConfig.dice);
          const probabilities = await calculator.calculateWinProbabilities();

          const probabilityTable = await new ProbabilityTable(
            probabilities,
            diceNames
          );
          await probabilityTable.displayIntro();
          await probabilityTable.displayAll();
          await this.diceSelect(this.playerFirst);
          return;
        }

        this.playerDice = option.selection;
      }

      await this.diceThrow();
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async order() {
    const diceConfig = new DiceConfig();
    const fairPlay = new FairPlay(
      this.generator.randomKey(),
      this.generator.getRandomInt(0, 1)
    );

    diceConfig.dieParse(process.argv.slice(2));

    try {
      generateHMAC(this.generator, fairPlay);
      console.log(chalk.blue(`  Let's determine who goes first?`));
      logHMAC(fairPlay);

      while (true) {
        const option = await inquirer.prompt(numberSelect);
        if (option.selection === "exit") {
          console.log(chalk.white.bold(EXIT_MESSAGE));
          process.exit(1);
        }
        if (option.selection === "help") {
          const diceNames = await diceConfig.dice.map((die) => die.join(","));
          const calculator = new ProbabilityCalculator(diceConfig.dice);
          const probabilities = await calculator.calculateWinProbabilities();

          const probabilityTable = await new ProbabilityTable(
            probabilities,
            diceNames
          );
          await probabilityTable.displayIntro();
          await probabilityTable.displayAll();

          continue;
        }

        console.log(chalk.blue(`  Your selection: ${option.selection}`));
        console.log(chalk.blue(`  My selection: ${fairPlay.number}`));
        logKey(fairPlay);
        if (option.selection === fairPlay.number) this.playerFirst = true;

        break;
      }

      await this.diceSelect(this.playerFirst);
    } catch (error) {
      console.error("Error:", error);
      process.exit(1);
    }
  }
  catch(err) {
    console.log("Error: ", err);
  }
}
