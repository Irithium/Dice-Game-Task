import chalk from "chalk";

let dices = process.argv.slice(2);

if (dices.length < 3) {
  console.log(
    chalk.red.bold("Error: User specified only two dice or no dice at all")
  );
} else console.log(dices);
