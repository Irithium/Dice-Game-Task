# Notes for Generalized Dice Game Task

## Task Summary

I will create a console script that implements a generalized dice game using JavaScript and Node.js. The program will accept command line parameters for multiple dice configurations and allow the user to play against the computer, ensuring fair play through secure random generation and HMAC.

### Key Requirements

1. **Input Handling**: I need to accept three or more strings as command line parameters, each containing 6 comma-separated integers representing the dice values. Example:

   ```
    node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
   ```

2. **Error Reporting**:

   - I must display a clear error message if the input is incorrect, explaining the issue and providing an example of valid input.

3. **Gameplay**:

   - Both the user and the computer need to select different dice, roll them, and whoever rolls higher wins.
   - The first move is determined fairly by generating a provable random number.

4. **Random Number Generation**:

   - I must use a cryptographically secure method to generate random numbers. This includes:
     - Generating a secure random key (at least 256 bits long).
     - Generating a uniformly distributed random integer within the range of the dice.
     - Calculating and displaying HMAC based on the generated integer and the secret key.

5. **User Interaction**:

   - Users will select options via a command line interface (CLI) menu.

6. **Help Option**:

   - The user can view a help table that presents the probabilities of winning for each pair of dice, which must be generated in a separate class.

7. **Code Structure**:

   - The application should consist of at least 6-9 classes, such as:
     - Dice configuration parsing.
     - Fair random number generation.
     - HMAC calculation.
     - Probability calculation.
     - User interface handling.
     - Dice abstraction.

8. **Submission**: To submit the task, I need to send an email to **p.lebedev@itransition.com** with:
   - A link to a public video demonstrating various game scenarios and error cases.
   - A link to the public GitHub repository containing the code.

### Example Output

Here is an example of what the game session should look like:

```
> node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
- Lets determine who makes the first move.
- I selected a random value in the range 0..1 (HMAC=C8E79615E637E6B14DDACA2309069A76D0882A4DD8102D9DEAD3FD6AC4AE289A).
- Try to guess my selection.
- 0 - 0
- 1 - 1
- X - exit
- ? - help
- Your selection: 0
- My selection: 1 (KEY=BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2).
- I make the first move and choose the [6,8,1,1,8,6] dice.
- Choose your dice:
- 0 - 2,2,4,4,9,9
- 1 - 7,5,3,7,5,3
- X - exit
- ? - help
- Your selection: 0
- You choose the [2,2,4,4,9,9] dice.
```

### Additional Notes

- It’s important to use core class libraries and relevant third-party libraries (especially for table generation and HMAC handling).
- I need to strictly follow the order of operations for fair play verification.
- Every decision made by the program (including showing keys and results) is critical for gaining user trust in the game's fairness.

This task is a great opportunity to deepen my understanding of hash functions, secure coding practices, object-oriented programming, and the importance of user engagement through a command line interface.
