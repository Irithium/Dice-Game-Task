import _ from "lodash";

export default class ProbabilityCalculator {
  constructor(diceArrays) {
    this.diceArrays = diceArrays;
  }

  countWins(dieA, dieB) {
    try {
      return _.sumBy(dieA, (x) => _.countBy(dieB, (y) => x > y)[true] || 0);
    } catch (error) {
      console.error("Error counting wins:", error);
      return 0;
    }
  }

  calculateWinProbabilities() {
    try {
      const numDice = this.diceArrays.length;
      const probabilities = [];
      for (let i = 0; i < numDice; i++) {
        const rowProbabilities = [];
        for (let j = 0; j < numDice; j++) {
          const wins = this.countWins(this.diceArrays[i], this.diceArrays[j]);
          const totalCombinations =
            this.diceArrays[i].length * this.diceArrays[j].length;

          if (totalCombinations === 0) {
            rowProbabilities.push(0);
          } else {
            const probability = wins / totalCombinations;
            rowProbabilities.push(probability);
          }
        }
        probabilities.push(rowProbabilities);
      }

      return probabilities;
    } catch (error) {
      console.error("Error calculating win probabilities:", error);
      return [];
    }
  }
}
