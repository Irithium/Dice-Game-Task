import chalk from "chalk";

export default class DiceConfig {
  constructor(dice) {
    this.dice = dice;
  }

  validateInput() {
    const integerRegex = /^-?\d+$/;
    let diceCounter = 0;

    if (this.dice.length < 3) {
      console.log(
        chalk.red.bold(
          "Error: User specified less than three dice or no dice at all. Please make sure you input at least three dice" +
            chalk.yellow(" Example: 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3")
        )
      );
      process.exit(1);
    }

    for (const die of this.dice) {
      diceCounter++;

      if (die.length !== 6) {
        console.log(
          chalk.red.bold(
            `Error: It appears that one of the dice you have entered do not have 6 faces. Die number: ${diceCounter}` +
              chalk.yellow(" Example: 2,2,4,4,9,9")
          )
        );
        process.exit(1);
      }

      for (const face of die) {
        if (!integerRegex.test(face)) {
          console.log(
            chalk.red.bold(
              `Error: Please ensure that all faces of the dice are represented by whole numbers. Die number: ${diceCounter}` +
                chalk.yellow(" Example: 7,5,3,7,5,3")
            )
          );
          process.exit(1);
        }
      }
    }
  }

  dieParse(dice) {
    this.dice = dice.map(
      (die) => (die = die.split(",").map((face) => parseInt(face.trim(), 10)))
    );
  }
}
