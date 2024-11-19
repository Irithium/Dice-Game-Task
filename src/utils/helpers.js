// utils/helpers.js
import chalk from "chalk";
import {
  DICE_RESULT_MESSAGE,
  HMAC_MESSAGE,
  KEY_MESSAGE,
} from "../config/constants.js";

export const generateHMAC = (generator, fairPlay) => {
  fairPlay.hmac = generator.calculateHMAC(
    fairPlay.key,
    fairPlay.number.toString()
  );
};

export const logHMAC = (fairPlay) => {
  console.log(chalk.cyan.bold(HMAC_MESSAGE) + chalk.cyan(fairPlay.hmac));
};
export const logKey = (fairPlay) => {
  console.log(chalk.cyan.bold(KEY_MESSAGE) + chalk.cyan(fairPlay.key));
};

export const logDiceResult = (number, selection, result) => {
  console.log(
    chalk.blue(
      `${DICE_RESULT_MESSAGE} ${number} + ${selection} = ${result} (mod 6)`
    )
  );
};
