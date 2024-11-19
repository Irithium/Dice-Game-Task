import chalk from "chalk";
import inquirer from "inquirer";
import {
  askNamePrompt,
  instructionsText,
  menuPrompt,
  nameConfirmPrompt,
  welcomePrompt,
} from "../utils/prompts.js";
import PlayOrder from "./PlayOrder.js";
import { MESSAGES, SELECTIONS } from "../config/constants.js";

export default class Game {
  constructor(username) {
    this.username = username;
  }

  async greeting() {
    try {
      const nameConfirmation = async () => {
        const option = await inquirer.prompt(
          await nameConfirmPrompt(this.username)
        );
        if (option.nameConfirm) {
          console.log(MESSAGES.greatChoice);
        } else {
          await askName();
        }
      };

      const askName = async () => {
        try {
          const answers = await inquirer.prompt(askNamePrompt);
          this.username = answers.user;
          await nameConfirmation();
        } catch (error) {
          console.error(MESSAGES.error, error);
          process.exit(1);
        }
      };

      console.log(chalk.cyan.bold(await welcomePrompt));
      await askName();
    } catch (err) {
      console.log(MESSAGES.somethingWentWrong);
      console.dir(err);
      process.exit(1);
    }
  }

  async menu() {
    try {
      const startMenu = async () => {
        const playOrder = new PlayOrder();
        const option = await inquirer.prompt(menuPrompt);
        switch (option.selection) {
          case SELECTIONS.START:
            await playOrder.order();
            break;
          case SELECTIONS.CLOSE:
            console.log(MESSAGES.seeYou);
            process.exit(1);
          case SELECTIONS.INSTRUCTIONS:
            instructionsText();
            break;
          default:
            process.exit(1);
        }
      };

      await startMenu();
    } catch (err) {
      console.error(MESSAGES.error, err);
      process.exit(1);
    }
  }
}
