# Dice Game Instructions

## Overview

Welcome to the **Generalized Dice Game**! In this game, you will compete against the computer by selecting different sets of dice, rolling them, and comparing the results to see who wins. The game is designed to be fair and transparent, allowing you to verify that the computer is not cheating.

## How to Start the Game

1. **Launch the Game**:
   You will need to run the program from the command line with the appropriate parameters. The parameters consist of three or more strings, each containing six comma-separated integers that represent the faces of the dice.

   **Example command**:

   ```bash
   node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
   ```

## Game Rules

1. **Input Validation**:
   If you provide incorrect arguments (e.g., fewer than three dice, non-integer values, or invalid configurations), the game will display an error message explaining the issue and how to format your input correctly.
2. **Determine Who Goes First**:

   - The game will randomly select either you or the computer to make the first move. This selection is fair and you will be able to verify its fairness through a displayed HMAC value.

3. **Selecting Dice**:

   - After determining who goes first, the computer will select one of its dice sets. You will then be presented with a menu of the available dice sets to choose from for your turn.

4. **Rolling the Dice**:

   - Once you've selected your dice, both you and the computer will roll your respective dice. You will be prompted to choose a number to add to the computer's roll, and the game will perform a modulo operation to determine the final results.
   - The computer's roll and HMAC value will be shown to ensure transparency.

5. **Winning the Game**:
   - The player with the higher roll wins the round! The results of the game will be displayed at the end, indicating whether you won or lost.

## Help Option

- You can access help at any time by selecting the `?` option in the menu. This will present you with a table displaying the probabilities of winning for each pair of dice, which will help you strategize your selections.

## Important Notes

- The program utilizes secure methods for generating random values to ensure fairness in the game.
- Every time the computer rolls, it generates a cryptographically secure random key, calculates an HMAC, and presents the HMAC to you before you make your roll.
- You can verify the fairness of the game's random value generation by checking the displayed HMAC.

## Example Game Flow

Here’s a brief overview of a typical game session:

1. Launch the game with the command:

   ```bash
   node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
   ```

2. The game determines who goes first and displays the HMAC showing the fairness of the selection.

3. You select your dice from the available options.

4. The computer selects its dice and generates a random number with a displayed HMAC.

5. You choose a number from 0 to the maximum of your dice (using modulo) to add to the computer's roll.

6. The game shows the results of both rolls, displaying both your results and the computer's, along with the final outcome (who wins).

## Conclusion

The **Generalized Dice Game** is an engaging way to test your luck against a computer while ensuring fairness and transparency throughout the play. Follow these instructions to start playing and enjoy the experience! If you have any questions or concerns, feel free to reference the help option at any time during the game. Good luck!
