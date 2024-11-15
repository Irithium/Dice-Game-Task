import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

export default class Game {
  constructor(userDice, computerDice) {
    this.userDice = userDice;
    this.computerDice = computerDice;
  }

  async greeting(user) {
    try {
      const data = await figlet.text("Welcome to the Dice Game ! !", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: undefined,
        whitespaceBreak: true,
      });

      console.log(chalk.cyan.bold(data));
      const askName = async () => {
        await inquirer
          .prompt({
            type: "input",
            name: "user",
            message: "What is your name?",
            validate: (input) => {
              if (!input.trim()) {
                return "Please, write a name!";
              }
              return true;
            },
          })
          .then(async (answers) => {
            user.name = answers.user;
          })
          .catch((error) => {
            console.error("Error:", error);
            process.exit(1);
          });
      };

      await askName();

      const nameConfirmation = async () => {
        await inquirer
          .prompt({
            type: "select",
            name: "nameConfirm",
            message: `Hello ${user.name}, is this your name?`,
            choices: [
              { key: "start", name: "✅ - Yes", value: true },
              { key: "close", name: "❌ - No", value: false },
            ],
          })
          .then(async (bool) => {
            if (bool.nameConfirm) {
              console.log(chalk.blue(`  Thank you, now what do you wanna do?`));
            } else {
              await askName();
              await nameConfirmation();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            process.exit(1);
          });
      };

      await nameConfirmation();
    } catch (err) {
      console.log("Something went wrong...");
      console.dir(err);
      process.exit(1);
    }
  }

  async startMenu() {
    try {
      const menus = [
        {
          type: "select",
          name: "selected",
          message: `Choose an option:`,
          choices: [
            { key: 1, name: "🎲 - Start", value: "start" },
            { key: 2, name: "❌ - Close", value: "close" },
            {
              key: 3,
              name: "❔ - Instructions",
              value: "instructions",
            },
          ],
        },
      ];

      const startMenu = async () => {
        await inquirer
          .prompt(menus)
          .then(async (option) => {
            switch (option.selected) {
              case "start": {
              }
              case "close": {
                console.log(chalk.white.bold("  See you next time!"));
                process.exit(1);
              }

              case "instructions": {
                try {
                  console.log(
                    chalk.blue.bold(`  ## Example Game Flow`) +
                      chalk.blue(
                        `\n  Here’s a brief overview of a typical game session: 
        \n  1. Launch the game with the command:`
                      ) +
                      chalk.bgBlack
                        .rgb(225, 225, 225)
                        .bold(
                          `\n     node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3\n`
                        ) +
                      chalk.blue(
                        `  2. The game will randomly select either you or the computer to make the first move. (This selection is fair and you will be able to verify its fairness through a displayed HMAC value.) \n  3. You select your dice from the available options. \n  4. The computer selects its dice and generates a random number with a displayed HMAC. \n  5. You choose a number from 0 to the maximum of your dice (using modulo) to add to the computer's roll. \n  6. The game shows the results of both rolls, displaying both your results and the computer's, along with the final outcome (who wins).`
                      )
                  );

                  await setTimeout(() => {
                    startMenu();
                  }, 500);
                } catch (err) {
                  console.error("Error: ", err);
                }
                break;
              }

              default: {
                process.exit(1);
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            process.exit(1);
          });
      };

      await startMenu();
    } catch (err) {}
  }
}
