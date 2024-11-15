import chalk from "chalk";

const checkup = (dices) => {
  const integerRegex = /^-?\d+$/;
  let diceCounter = 0;

  if (dices.length < 3) {
    console.log(
      chalk.red.bold(
        "Error: User specified less than three dice or no dice at all. Please make sure you input at least three dice" +
          chalk.yellow(" Example: 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3")
      )
    );
    process.exit(1);
  }

  for (const dice of dices) {
    diceCounter++;
    let faces = dice.split(",");

    if (faces.length !== 6) {
      console.log(
        chalk.red.bold(
          `Error: It appears that one of the dice you have entered do not have 6 faces. Die number: ${diceCounter}` +
            chalk.yellow(" Example: 2,2,4,4,9,9")
        )
      );
      process.exit(1);
    }

    for (const face of faces) {
      if (!integerRegex.test(face.trim())) {
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
};

export default checkup;
