import chalk from "chalk";

export const ORDER_RANGE = { min: 0, max: 1 };
export const RANDOM_RANGE = { min: 0, max: 5 };
export const HMAC_MESSAGE = "  HMAC:";
export const KEY_MESSAGE = "  KEY:";
export const DICE_RESULT_MESSAGE = "  The result is";
export const EXIT_MESSAGE = "  See you next time!";

export const MESSAGES = {
  greatChoice: chalk.blue(`  Great, now what do you want to do?`),
  seeYou: chalk.white.bold("  See you next time!"),
  error: "Error:",
  somethingWentWrong: "Something went wrong...",
};

export const SELECTIONS = {
  START: "start",
  CLOSE: "close",
  INSTRUCTIONS: "instructions",
};
