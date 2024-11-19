import chalk from "chalk";
import figlet from "figlet";
import Game from "../classes/Game.js";

export const welcomePrompt = await figlet.text("Welcome to the Dice Game ! !", {
  font: "Standard",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: undefined,
  whitespaceBreak: true,
});

export const askNamePrompt = {
  type: "input",
  name: "user",
  message: "What is your name?",
  validate: (input) => {
    if (!input.trim()) {
      return "Please, write a name!";
    }
    return true;
  },
};

export const nameConfirmPrompt = async (username) => {
  try {
    return {
      type: "select",
      name: "nameConfirm",
      message: `Hello ${username}, is this your name?`,
      choices: [
        { key: "start", name: "✅ - Yes", value: true },
        { key: "close", name: "❌ - No", value: false },
      ],
    };
  } catch (err) {
    console.error("Error: ", err);
  }
};

export const menuPrompt = {
  type: "select",
  name: "selection",
  message: `Choose an option:`,
  choices: [
    { key: 1, name: "🎲 - Start", value: "start" },
    { key: 2, name: "❌ - Exit", value: "close" },
    {
      key: 3,
      name: "❔ - Instructions",
      value: "instructions",
    },
  ],
};

export const numberSelect = {
  type: "select",
  name: "selection",
  message: `Try to guess my selection.`,
  choices: [
    { key: 1, name: "0️⃣  - 0", value: 0 },
    { key: 2, name: "1️⃣  - 1", value: 1 },
    { key: 3, name: "❌ - Exit", value: "exit" },
    {
      key: 4,
      name: "❔ - Help",
      value: "help",
    },
  ],
};

export const instructionsText = async () => {
  const game = new Game();
  try {
    console.log(
      chalk.blue.bold(`  ## Example Game Flow`) +
        chalk.blue(
          `\n  Here’s a brief overview of a typical game session: 
          \n  1. Launch the game with the command:`
        ) +
        chalk.bgBlack
          .rgb(225, 225, 225)
          .bold(`\n     node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3\n`) +
        chalk.blue(
          `  2. The game will randomly select either you or the computer to make the first move. (This selection is fair and you will be able to verify its fairness through a displayed HMAC value.) \n  3. You select your dice from the available options. \n  4. The computer selects its dice and generates a random number with a displayed HMAC. \n  5. You choose a number from 0 to the maximum of your dice (using modulo) to add to the computer's roll. \n  6. The game shows the results of both rolls, displaying both your results and the computer's, along with the final outcome (who wins).`
        )
    );

    await setTimeout(() => {
      game.menu();
    }, 500);
  } catch (err) {
    console.error("Error: ", err);
  }
};

export const diceSelectPrompt = (dice) => {
  let diceCounter = 0;
  try {
    return {
      type: "select",
      name: "selection",
      message: `Choose your dice:`,
      choices: [
        ...dice.map((die) => {
          let option = {
            key: diceCounter,
            name: ` ${diceCounter} - [${die}]`,
            value: die,
          };
          diceCounter++;

          return option;
        }),
        {
          key: diceCounter + 1,
          name: "❌ - Exit",
          value: "exit",
        },
        {
          key: diceCounter + 2,
          name: "❔ - Help",
          value: "help",
        },
      ],
    };
  } catch (err) {
    console.error("Error: ", err);
  }
};

export const diceThrowPrompt = (dice) => {
  let diceCounter = 0;
  try {
    return {
      type: "select",
      name: "selection",
      message: `Choose your dice:`,
      choices: [
        ...dice.map((die) => {
          let option = {
            key: diceCounter,
            name: ` ${diceCounter}`,
            value: diceCounter,
          };
          diceCounter++;

          return option;
        }),
        {
          key: diceCounter + 1,
          name: "❌ - Exit",
          value: "exit",
        },
      ],
    };
  } catch (err) {
    console.error("Error: ", err);
  }
};
